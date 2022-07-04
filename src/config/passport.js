const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({    //could said to be a "model"
    usernameField: 'email'
}, async (email, password, done) => {   //done() ends the authentication process
   const user = await User.findOne({email: email}); //bring document 
   if(!user) {
       return done(null, false, {message: 'User not found'}); //done(error, user, msg) // This is a flash message but default is called 'error'
   } else {
       const match = await user.matchPassword(password);
       if(match) {
           return done(null, user); 
       } else {
           return done(null, false, { message: 'Incorrect Password'});
       }
   }
}));

passport.serializeUser((user, done) => {    //required method by passport
    done(null, user.id);
});

passport.deserializeUser((id, done) => {    //required method by passport
    User.findById(id, (err, user) => {
        done(err, user);
    });
});