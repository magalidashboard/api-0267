const { password } = require('pg/lib/defaults');
const database = require('../config/database');
const modelUser = require('../database/models/modelAdminUser');

exports.createUser = async (email, username, password) => {
    try {
        const createUser = await modelUser.create({
            email: email,
            nickname: username,
            password: password
        });
    }
    catch (err) {
        console.log(err)
    }
}

exports.getUsers = async () => {
    try{
        const getUsers = await modelUser.findAll();
        return getUsers.sort((a, b) => {
            if (a.id < b.id)
                return -1;
            if (a.id > b.id)
                return 1;
            return 0;
        });
    }
    catch(err) {
        console.log(err)
    }
}

exports.getThisUser = async (id) => {
    try{

        const getThisUser = await modelUser.findByPk(id)
            .then(thisUser => {
                if(!thisUser) {
                    return 'User not found';
                }

                return thisUser;
            });

        return getThisUser;

    }
    catch(err) {
        console.log(err)
    } 
}

exports.updateThisUser = async (id, email = undefined, username = undefined, password = undefined) => {
    try{
        const thisUser = await modelUser.findByPk(id)
        .then(async User => {
            if(!User){
                return 'User not found';
            }

            email != undefined ? User.update({ email: email }) : '';
            username != undefined ? User.update({ username: nickname }) : '';
            password != undefined ? User.update({ password: password }) : '';

            const saveUser = await User.save();
            return saveUser;

        });
    
        return thisUser;
    }
    catch(err){
        console.log(err)
    }

}

exports.destroyThisUser = async (id) => {
    try {
        const thisUser = await modelUser.findByPk(id)
            .then(destroyUser => {
                if(!destroyUser){
                    return 'User not found';
                }

                destroyUser.destroy();
                return 'User deleted';
            });
        
        return thisUser;
        
    } 
    catch(err){
        console.log(err)
    }
}

