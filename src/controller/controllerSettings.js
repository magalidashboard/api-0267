const serviceContent = require('../services/serviceSettings');

exports.create = async ( req, res, next ) => {

    let {        
        mercado_pago_store, 
        mercado_pago_key, 
        mercado_pago_token, 
        mercado_pago_url_success,
        mercado_pago_url_pending,
        mercado_pago_url_failure,
        mercado_pago_notification_url,
        pagseguro_id, 
        pagseguro_key, 
        pagseguro_public_key,  
        tax, 
        whatsapp_message
    } = req.body;

    if(![
        mercado_pago_store, 
        mercado_pago_key, 
        mercado_pago_token, 
        mercado_pago_url_success,
        mercado_pago_url_pending,
        mercado_pago_url_failure,
        mercado_pago_notification_url,
        pagseguro_id, 
        pagseguro_key, 
        pagseguro_public_key,  
        tax, 
        whatsapp_message
    ].includes(undefined)){
        await serviceContent.create(
            mercado_pago_store, 
            mercado_pago_key, 
            mercado_pago_token, 
            mercado_pago_url_success,
            mercado_pago_url_pending,
            mercado_pago_url_failure,
            mercado_pago_notification_url,
            pagseguro_id, 
            pagseguro_key, 
            pagseguro_public_key,  
            tax, 
            whatsapp_message
        );

        res.status(200).json({
            mercado_pago_store, 
            mercado_pago_key, 
            mercado_pago_token, 
            mercado_pago_url_success,
            mercado_pago_url_pending,
            mercado_pago_url_failure,
            mercado_pago_notification_url,
            pagseguro_id, 
            pagseguro_key, 
            pagseguro_public_key,  
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
        mercado_pago_store, 
        mercado_pago_key, 
        mercado_pago_token, 
        mercado_pago_url_success,
        mercado_pago_url_pending,
        mercado_pago_url_failure,
        mercado_pago_notification_url,
        pagseguro_id, 
        pagseguro_key, 
        pagseguro_public_key,  
        tax, 
        whatsapp_message } = req.body;
    let { id } = req.params;

    if(
        mercado_pago_store != undefined ||
        mercado_pago_key != undefined ||
        mercado_pago_token != undefined ||
        mercado_pago_url_success != undefined ||
        mercado_pago_url_pending != undefined ||
        mercado_pago_url_failure != undefined ||
        mercado_pago_notification_url != undefined ||
        pagseguro_id != undefined || 
        pagseguro_key != undefined || 
        pagseguro_public_key != undefined ||
        tax != undefined || 
        whatsapp_message != undefined
        ) {

            await serviceContent.updatethis(
                id, 
                mercado_pago_store, 
                mercado_pago_key, 
                mercado_pago_token, 
                mercado_pago_url_success,
                mercado_pago_url_pending,
                mercado_pago_url_failure,
                mercado_pago_notification_url,
                pagseguro_id, 
                pagseguro_key, 
                pagseguro_public_key,  
                tax, 
                whatsapp_message
            );
        
            res.status(200).json({
                mercado_pago_store, 
                mercado_pago_key, 
                mercado_pago_token, 
                mercado_pago_url_success,
                mercado_pago_url_pending,
                mercado_pago_url_failure,
                mercado_pago_notification_url,
                pagseguro_id, 
                pagseguro_key, 
                pagseguro_public_key,  
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