const database = require('../config/database');
const modelUser = require('../database/models/modelUser');

// id
// email
// nickname
// password

exports.createUser = async (email, nickname, password) => {
    try {
        const createUser = await modelUser.create({
            email: email,
            nickname: nickname,
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

exports.updateThisUser = async (id, email = undefined, nickname = undefined, password = undefined) => {
    try{
        const thisUser = await modelUser.findByPk(id)
        .then(async User => {
            if(!User){
                return 'User not found';
            }

            email != undefined ? User.update({ email: email }) : '';
            nickname != undefined ? User.update({ nickname: nickname }) : '';
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

