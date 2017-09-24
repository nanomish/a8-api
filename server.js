const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const mongoose         = require('mongoose');
const ip             = require("ip");
const app            = express();
const passport       = require('passport');
const authOptions    = require('./config/auth');
const LocalStrategy    = require('passport-local').Strategy;
const JwtStrategy      = require('passport-jwt').Strategy;
var User = require('./app/models/user')

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

/* TODO: mongoose connect should handle connection errors */
mongoose.connect(db.url);
mongoose.connection.on('error', function(error) {
  console.log('Error connecting to DB')
});

mongoose.connection.on('open', function(error) {
  console.log('Yay connected to DB');
});

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.dir ( ip.address() );
    console.log('We are live on ' + ip.address() + ':' + port);
  });               
});

// Configure Passport to use local strategy for initial authentication.
passport.use('local', new LocalStrategy(User.authenticate()));
 
console.log('=====> ', authOptions)
// Configure Passport to use JWT strategy to look up Users.
passport.use('jwt', new JwtStrategy(authOptions.options, function(jwt_payload, done) {
  console.log('jwt strategy, jwt_payload: ', jwt_payload)
  User.findOne({
    _id: jwt_payload.id
  }, function(err, user) {
    if (err) {
      console.log('jwt strategy, error: ', error)
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
}));