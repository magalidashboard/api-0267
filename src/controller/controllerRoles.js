const serviceContent = require('../services/serviceRoles');
const bcrypt = require('bcryptjs');

exports.create = async ( req, res, next ) => {

    let { roleAcess, roleName } = req.body;

    roleAcess = bcrypt.hashSync(roleAcess);
    roleName = bcrypt.hashSync(roleName);

    if(![roleAcess, roleName].includes(undefined)){
        await serviceContent.create(
            roleAcess, 
            roleName
        );

        res.status(200).json({
            roleAcess, 
            roleName
        });

    }

}

exports.gets = async ( req, res, next ) => {
    
    const gets = await serviceContent.gets();

    if(gets.length > 0){
        res.status(200).json({
            gets
        });

        return;
    }

    res.status(400).json({
        error: 'We couldn`t find any'
    })

}

exports.gethis = async ( req, res, next ) => {
    let { id } = req.params;

    if(id){
        const _this = await serviceContent.gethis(id);

        res.status(200).json({
            _this
        });

        return;

    }

    res.status(400).json({
        error: 'Wrong id or doens`t exists'
    });

}

exports.updatethis = async ( req, res, next ) => {
    let { roleAcess, roleName } = req.body;
    let { id } = req.params;

    if(roleAcess = undefined, roleName = undefined) {
        
        await serviceContent.updatethis(
            id, 
            roleAcess, 
            roleName
        );

        res.status(200).json({
            email,
            username,
            password
        });

        return;
    }

    res.status(400).json({
        error: 'Incorrect id'
    });

}

exports.destroythis = async ( req, res, next ) => {
    let { id } = req.params;

    if(id){

        const destroythis = await serviceContent.destroythis(id);

        res.status(200).json({
            destroythis
        });

        return;

    }

    res.status(400).json({
    error: 'Id doesn`t exist`s'
    })

}