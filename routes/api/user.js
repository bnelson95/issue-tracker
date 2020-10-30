import express from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';

import { SECRET } from "../../config.js";
import validateRegisterInput from "../../validation/register.js";
import validateLoginInput from "../../validation/login.js";
import User from "../../models/user.js";

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
    if (err) { console.log(err); }
    if (info) { console.log(info); }
    if (!user) { res.status(403); }

    res.send({ profile: user });
  })(req, res);
});

export default router;
