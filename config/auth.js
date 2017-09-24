// JWT configuration
const ExtractJwt = require('passport-jwt').ExtractJwt;

var options = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: '7x0jhxt&%*&)^(BJHKd89_-='
}
 module.exports = {
  options: options
};