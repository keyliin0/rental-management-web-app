const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const user = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.redirectDomain + "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken + " " + refreshToken);
      const existingUser = await user.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const User = await new user({
          googleId: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          imgURL: profile.photos[0].value
        }).save();
        done(null, User);
      }
    }
  )
);
