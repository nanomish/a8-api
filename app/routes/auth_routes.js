const User = require('../models/user')
const passport = require('passport');
const jwt = require('jsonwebtoken')
const authOptions    = require('../../config/auth');

module.exports = function(app, db) {
    app.post('/register', function (req, res) {
        User.register(new User({ email: req.body.email }), req.body.password, function (err, user) {
            if (err) {
            return res.status(400).send({ error: 'Email address in use.' })
            }
            res.status(200).send({ user: user.id });
        });
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }
            if (user) {
                var token = jwt.sign({ id: user._id, email: user.email }, authOptions.options.secretOrKey);
                return res
                    .status(200)
                    .json({ token });
                }
        })(req, res, next);
    });

    app.get('/protected', function (req, res, next) {
        passport.authenticate('jwt', function (err, user, info) {
            if (err) {
            // internal server error occurred
                return next(err);
            }
            if (!user) {
            // no JWT or user found
                return res.status(401).json({ error: 'Invalid credentials for protected.' });
            }
            if (user) {
            // authentication was successful! send user the secret code.
                return res
                    .status(200)
                    .json({ secret: '123' });
                }
        })(req, res, next);
    });
};