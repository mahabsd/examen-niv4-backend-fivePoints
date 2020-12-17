const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require("../models/user")

passport.use(new LocalStrategy({
    
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
    User.findOne({email:email},function(err,doc){
      
      if(doc!=null){
      
        bcrypt.compare(password, doc.password, function(err, result) {
            if(result) {
           
              return done(null,doc)
            } else {
                return done(null, false, { errors: { 'password': 'is invalid' } });
            } 
          });
      }
    
      
  
  }).catch(done)
    
}));