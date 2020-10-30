import passportJWT from 'passport-jwt'

import { SECRET } from './config.js'
import User from './models/user.js'

const JWTStrategy = passportJWT.Strategy;

const opt = {
  jwtFromRequest: req => req.cookies.token,
  secretOrKey: SECRET
};

const config = (passport) => {
  passport.use(
    new JWTStrategy(opt, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => done(null, user))
        .catch(err => done(err))
    })
  );
};

export default { config }