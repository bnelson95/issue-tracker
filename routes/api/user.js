import express from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import moment from 'moment';

import {
  SECRET,
  MAILER_SERVICE,
  MAILER_AUTH_USER,
  MAILER_AUTH_PASS
} from "../../config.js";
import validateRegisterInput from "../../validation/register.js";
import validateLoginInput from "../../validation/login.js";
import validateUpdatePasswordInput from "../../validation/updatePassword.js";
import validateUpdateProfileInput from "../../validation/updateProfile.js";
import validateResetPasswordInput from "../../validation/resetPassword.js";
import User from "../../models/user.js";
import Token from "../../models/token.js";

const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors } = validateRegisterInput(req.body);
  // Check validation
  if (errors && Object.keys(errors).length !== 0) {
    return res.json({ errors });
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.json({
          errors: {
            email: "Email already exists"
          }
        });
      }
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json({ user }))
            .catch(err => console.log(err));
        });
      });
    });
});

router.get("/logout", (_, res) => {
  return res.clearCookie('token', { path: '/' })
    .json({ success: true })
    .status(200)
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors } = validateLoginInput(req.body);
  // Check validation
  if (errors && Object.keys(errors).length !== 0) {
    return res.json({ errors });
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.json({
        errors: {
          email: "Email not found"
        }
      });
    }
    // Check password
    bcryptjs.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jsonwebtoken.sign(
          payload,
          SECRET,
          { expiresIn: 31556926 }, // 1 year in seconds
          (err, token) => {
            res.cookie('token', token, { httpOnly: true, path: '/' })
            res.json({ token });
          }
        );
      } else {
        return res.json({
          errors: {
            password: "Password incorrect"
          }
        });
      }
    });
  });
});

router.get('/profile', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) return res.status(403).send()
    user.password = undefined
    user.passwordResetExpires = undefined
    user.passwordResetToken = undefined
    user.date = undefined
    return res.status(200).send({ profile: user });
  })(req, res);
});

router.post('/profile', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) { res.status(403); }
    try {
      const { errors } = validateUpdateProfileInput(req.body);
      if (errors && Object.keys(errors).length !== 0) return res.json({ errors });
      const response = await User.findByIdAndUpdate(user.id, req.body)
      if (!response) throw Error('Something went wrong ')
      const updated = { ...response._doc, ...req.body }
      res.status(200).json({ profile: updated })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })(req, res)
})

router.post('/password', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) { res.status(403); }
    try {
      const { errors } = validateUpdatePasswordInput(req.body);
      if (errors && Object.keys(errors).length !== 0) {
        return res.json({ errors });
      }
      const currentUser = await User.findById(user.id)
      if (!currentUser) throw Error('Something went wrong ')
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(req.body.newPassword, salt, (err, hash) => {
          if (err) throw err;
          currentUser.password = hash;
          currentUser.save()
            .then(updatedUser => res.status(200).json({ user: updatedUser }))
            .catch(err => console.log(err));
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })(req, res)
})

router.post('/login/forgot', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(200).json({ errors: { email: "Email does not exist" }})
  }
  try {
    // Create a verification token
    var token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex")
    });

    user.passwordResetToken = token.token;
    user.passwordResetExpires = moment().add(12, "hours");

    user.save(function(err) {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      // Save the token
      token.save(function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        // Send the mail
        var transporter = nodemailer.createTransport({
          service: MAILER_SERVICE,
          auth: {
            user: MAILER_AUTH_USER,
            pass: MAILER_AUTH_PASS
          }
        });
        var mailOptions = {
          from: MAILER_AUTH_USER,
          to: user.email,
          subject: 'Password Reset',
          html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n 
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            <a href="${req.headers.origin}/user/login/reset/${token.token}">${req.headers.origin}/user/login/reset/${token.token}</a> \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n </p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: error})
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: "Reset password email sent!" })
          }
        });
      })
    })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})

router.post("/login/reset/:token", (req, res) => {
  // Validate password Input
  const { errors } = validateResetPasswordInput(req.body);
  if (errors && Object.keys(errors).length !== 0)
    return res.json({ errors });
  // Find a matching token
  Token.findOne({ token: req.params.token }, function(err, token) {
    if (err)
      return res.send({ message: err.message });
    if (!token)
      return res.send({ message: "This token is not valid. Your token my have expired." });
    // If we found a token, find a matching user
    User.findById(token._userId, function(err, user) {
      if (err)
        return res.send({ message: err.message });
      if (!user)
        return res.send({ message: `We were unable to find a user for this token.` });
      if (user.passwordResetToken !== token.token)
        return res.send({ message: "User token and your token didn't match. You may have a more recent token in your mail list." });
      // Verify that the user token expires date has not been passed
      if (moment().utcOffset(0) > user.passwordResetExpires)
        return res.send({ message: "Token has expired." });
      // Update user
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(req.body.newPassword, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.passwordResetToken = "";
          user.passwordResetExpires = moment().utcOffset(0);
          // Save updated user to the database
          user.save(function(err) {
            if (err) return res.send({ message: err.message });
            // Send mail confirming password change to the user
            var transporter = nodemailer.createTransport({
              service: MAILER_SERVICE,
              auth: {
                user: MAILER_AUTH_USER,
                pass: MAILER_AUTH_PASS
              }
            });
            var mailOptions = {
              from: MAILER_AUTH_USER,
              to: user.email,
              subject: 'Password Reset Confirmation',
              html: `<p>This is a confirmation that the password for your account ${user.email} has just been changed. </p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error)
                return res.send({ message: error})
              else
                return res.send({ message: "Reset password email sent!" })
            });
            return res.send({ message: "Password has been reset. Please log in." });
          })
        })
      })
    });
  });
});

export default router;
