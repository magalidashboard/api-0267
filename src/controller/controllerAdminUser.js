const serviceContent = require('../services/serviceUserAdmin');
const bcrypt = require('bcryptjs');

exports.createUser = async ( req, res, next ) => {

    let { email, username, password } = req.body;

    let hasspass = bcrypt.hashSync(password)

    if(![email, username, password].includes(undefined)){
        await serviceContent.createUser(
            email,
            username,
            hasspass
        );

        res.status(200).json({
            email,
            username,
            password,
            hasspass
        });

    }

}

exports.getUsers = async ( req, res, next ) => {
    
    const getUsers = await serviceContent.getUsers();

    if(getUsers.length > 0){
        res.status(200).json({
            getUsers
        });

        return;
    }

    res.status(400).json({
        error: 'We couldn`t find Users'
    })

}

exports.getThisUser = async ( req, res, next ) => {
    let { id } = req.params;

    if(id){
        const thisUser = await serviceContent.getThisUser(id);

        res.status(200).json({
            thisUser
        });

        return;

    }

    res.status(400).json({
        error: 'Wrong user id or doens`t exists'
    });

}

exports.updateThisUser = async ( req, res, next ) => {
    let { email, username, password } = req.body;
    let { id } = req.params;

    if(email != undefined || username != undefined || password != undefined) {
        
        await serviceContent.updateThisUser(
            id, 
            email,
            username,
            password
        );

        res.status(200).json({
            email,
            username,
            password
        });

        return;
    }

    res.status(400).json({
        error: 'Incorrect user'
    });

}

exports.destroyThisUser = async ( req, res, next ) => {
    let { id } = req.params;

    if(id){

        const destroyUser = await serviceContent.destroyThisUser(id);

        res.status(200).json({
            destroyUser
        });

        return;

    }

    res.status(400).json({
        error: 'Incorrect user'
    })

}