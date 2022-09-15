const serviceContent = require('../services/serviceSettings');

exports.create = async ( req, res, next ) => {

    let {        
        asaas_api, 
        expire_day,
        tax, 
        whatsapp_message
    } = req.body;

    if(![
        asaas_api, 
        expire_day,
        tax, 
        whatsapp_message
    ].includes(undefined)){
        await serviceContent.create(
            asaas_api, 
            expire_day,
            tax, 
            whatsapp_message
        );

        res.status(200).json({
            asaas_api, 
            expire_day,
            tax, 
            whatsapp_message
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

    let {    
        asaas_api, 
        expire_day,
        tax, 
        whatsapp_message } = req.body;
    let { id } = req.params;

    if(
        asaas_api != undefined || 
        expire_day != undefined ||
        tax != undefined || 
        whatsapp_message != undefined
        ) {

            await serviceContent.updatethis(
                id, 
                asaas_api, 
                expire_day,
                tax, 
                whatsapp_message
            );
        
            res.status(200).json({
                asaas_api, 
                expire_day,
                tax, 
                whatsapp_message
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