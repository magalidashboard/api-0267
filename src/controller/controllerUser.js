const serviceContent = require('../services/serviceUser');
//const serviceRoles = require('../services/serviceRoles');
const bcrypt = require('bcryptjs');

exports.createUser = async ( req, res, next ) => {

    let { email, username, password, role } = req.body;
    let hasspass = bcrypt.hashSync(password);

    if(![email, username, password, role].includes(undefined)){
        await serviceContent.createUser(
            email,
            username,
            hasspass,
            role
        );

        res.status(200).json({
            email,
            username,
            password,
            hasspass,
            role
        });

    }

}

exports.getUsers = async ( req, res, next ) => {
    
    const getUsers = await serviceContent.getUsers();
    //const getRoles = await serviceRoles.gets();

    //CHECK IF ROLE ARE CORRECT
    //console.log(bcrypt.compareSync(getUsers[0].dataValues.role, getRoles[0].dataValues.roleAcess))

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

    if(email != undefined || username != undefined || password != undefined || role != undefined) {
        
        await serviceContent.updateThisUser(
            id, 
            email,
            username,
            password,
            role
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