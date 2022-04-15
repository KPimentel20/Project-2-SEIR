const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')
// new code below

// Finding the user document and passing to next link in middleware chain
passport.use(
    new GoogleStrategy(
        // Configuration object
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK
        },
      // The verify callback function
        function (accessToken, refreshToken, profile, cb) {  // CB is the verify callback, passes info to passport.serialzeUser
        // a user has logged in with OAuth...
            User.findOne({ googleId: profile.id }).then(async function (user) {
                if (user) return cb(null, user); // passes info to the next middleware
                // else, we have a new user via OAuth!
                try {
                    user = await User.create({
                        name: profile.displayName,
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value
                    });
                    return cb(null, user); // we continue on to the next middleware after logging
                } catch (err) {
                    return cb(err);
                }
            });
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user._id); // storing the logged in users id in our session cookie
});

// This happens on every request after the user is logged in
// We open the cookie 
passport.deserializeUser(function (userId, cb) {
    // finds User in db and assigns.... 
    User.findById(userId).then(function (user) {
        cb(null, user); // this assigns the user document we just found to the request object
        // assigns the user to req.user
    });
});

