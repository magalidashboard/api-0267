const serviceContent = require('../services/serviceExtract');
//const serviceRoles = require('../services/serviceRoles');
const bcrypt = require('bcryptjs');

exports.Create = async ( req, res, next ) => {

    let { extract_id, email, payment_link, payment_id, status } = req.body;

    if(![extract_id, email, payment_link, payment_id, status].includes(undefined)){
        await serviceContent.Create(
            extract_id, 
            email, 
            payment_link, 
            payment_id, 
            status
        );

        res.status(200).json({
            extract_id, 
            email, 
            payment_link, 
            payment_id, 
            status
        });

    }

}

exports.Gets = async ( req, res, next ) => {
    
    const Gets = await serviceContent.Gets();

    if(Gets.length > 0){
        res.status(200).json({
            Gets
        });

        return;
    }

    res.status(400).json({
        error: 'We couldn`t find any'
    })

}

exports.GetThis = async ( req, res, next ) => {
    let { id } = req.params;

    if(id){
        const thisUser = await serviceContent.GetThis(id);

        res.status(200).json({
            thisUser
        });

        return;

    }

    res.status(400).json({
        error: 'Wrong user id or doens`t exists'
    });

}

exports.Updates = async ( req, res, next ) => {
    let { extract_id, email, payment_link, payment_id, status } = req.body;

    if(extract_id != undefined || email != undefined || payment_link != undefined || payment_id != undefined || status != undefined) {
        
        await serviceContent.UpdateThis(
            extract_id, 
            email, 
            payment_link, 
            payment_id, 
            status
        );

        res.status(200).json({
            extract_id, 
            email, 
            payment_link, 
            payment_id, 
            status
        });

        return;
    }

    res.status(400).json({
        error: 'Incorrect user'
    });

}

exports.Destroys = async ( req, res, next ) => {
    let { extract_id } = req.params;

    if(extract_id){

        const destroyUser = await serviceContent.DestroyThis(extract_id);

        res.status(200).json({
            destroyUser
        });

        return;

    }

    res.status(400).json({
        error: 'Incorrect user'
    })

}