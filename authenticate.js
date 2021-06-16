var passport = require('passport');
var mysql = require('mysql');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "root",
  port     : "3306",
  database : "scheduler"
});


passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: '22690238248-oj6vfjfe67q2kfo2cjjf9e4e5882v42g.apps.googleusercontent.com',
    clientSecret: 'jjiAAd639Y2dLd6rSU8Vywmg',
    callbackURL: "http://localhost:8080/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    name = profile.displayName;
    email = profile.emails[0].value;
    // Register user here.
    console.log(name+'\n'+email);
    // console.log(profile);
    cb(null, profile);

    connection.query('DELETE FROM temp', function (error, results, fields) {
      if (error) {
          throw error;
      }
    });
    var sql1="INSERT INTO temp VALUES ('"+email+"', '"+name+"');"
    connection.query(sql1, function (error, results, fields) {
      if (error) {
          throw error;
      }
    });

  }
));