const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const database = require('../config/database');
const UserAdmin = require('../database/models/modelAdminUser');
const User = require('../database/models/modelUser');

module.exports = function(passport){

    async function findUser(username){
        try{
            const findUser = await User.findOne({ where: { nickname: username } }).then( async thisUser => {
                    if(!thisUser){
                        return 'Nothing found';
                    }

                    return thisUser;
            });

            const findAdmin = await UserAdmin.findOne({ where: { nickname: username } }).then( async thisUser => { 
                if(!thisUser){
                    return 'Nothing found';
                }

                return thisUser;
            });

            if(typeof findAdmin == 'object'){
                return findAdmin;
            } 

            if(typeof findUser == 'object'){
                return findUser
            }

        }
        catch(err){
            console.log(err)
        }
    }

    async function findUserById(id){
        try{
            const findUserById = await User.findByPk(id)
                .then( async thisUser => {
                    if(!thisUser){
                        return 'Nothing found';
                    }

                    return thisUser;
                });

                return findUserById;
        }
        catch(err){
            console.log(err)
        }
    }

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await findUserById(id);
            done(null, user);
        }
        catch(err) { done(err, null) }
    });

    passport.use(new 
        LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            async (username, password, done) => {
                try{
                    const user = await findUser(username);
                    if(!user) return done (null, false, { err: 'Unauthorized' });

                    const isValid = bcrypt.compareSync(password, user.password);
                    if(!isValid) return done (null, false, { err: 'Unauthorized' });

                    return done (null, user);
                }
                catch(err) { done(err, false, { err: 'Unauthorized' }) }
            }
        )
    );

    passport.use(new 
        JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.SECRET_TOKEN
            },
            function (jwtPayLoad, cb) {
                return User.findByPk(jwtPayLoad.id)
                    .then(user => {
                        return cb(null, user);
                    })
                    .catch(err => {
                        return cb( err, { err: 'Unauthorized' });
                    });
            }
        )
    );

}


