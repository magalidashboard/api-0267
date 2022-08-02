const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, ( err, user, info) => {
        if(err || !user){
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login( user, { session: false }, ( err ) => {
            if(err) {
                res.status(400).json({ error: err});
            }

            const token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN);

            return res.status(200).json({ user, token });

        });
    })
    (req, res);
}