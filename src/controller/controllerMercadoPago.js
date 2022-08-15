const serviceMP = require('../services/serviceMercadoPago');
const serviceContent = require('../services/servicePaymentDetail');

exports.Create = async (req, res, next) => {
    let { payment_id, extract_id, payment_detail, price, cpf, professionalEmail } = req.body;

    if(![payment_id, extract_id, payment_detail, price, cpf, professionalEmail].includes(undefined)){
        let Payment = await serviceContent.Create(
            payment_id, extract_id, payment_detail, price, cpf, professionalEmail
        )
    
        res.status(200).json({
            Payment
        })

        return;
    }

    if([payment_id, extract_id, payment_detail, price, cpf, professionalEmail].includes('')){
        if(Object.keys(req.body).length == 0){
            res.status(400).json({
                error: 'empty data'
            })
        } else {
            res.status(400).json({
                error: req.body
            })
        }
    }

}


exports.getPublicKey = async (req, res, next) => {

    const getPublic = await serviceMP.getPublic();

    res.status(200).json({
        default: true,
        mpublic: process.env.MP_PUBLIC || getPublic[0].dataValues.mercado_pago_key,
    });

}

exports.Gets = async (req, res, next) => {
    const gets = await serviceContent.Gets();

    res.status(200).json({
        gets
    })
}

exports.PreferenceSearch = async (req, res, next) => {
    const payments = await serviceContent.PreferenceSearch(req.params.id);

    if(payments){
        res.status(200).json({
            payments
        })

        return;
    }

    res.status(400).json({
        error: payments
    })

}

exports.PaymentSearch = async (req, res, next) => {
    const payments = await serviceContent.PaymentSearch(req.params.id);

    if(payments){
        res.status(200).json({
            payments
        })

        return;
    }

    res.status(400).json({
        error: 'Erro ao procurar pagamentos'
    })

}

exports.GetThis = async (req, res, next) => {

    if(req.params.id){

        const gets = await serviceContent.GetThis(
            req.params.id,
        )

        const init_point = await serviceMP.createPaymentPreference(gets[0].dataValues.project, gets[0].dataValues.price);

        res.status(200).json({
            gets,
            link:init_point
        })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}


exports.GetFile = async (req, res, next) => {
    const gets = await serviceContent.GetFile();

    if(gets.length > 0){
        res.status(200).json({
            gets
        })
        return
    }

    res.status(400).json({
        error: 'File *.json doens`t exists'
    })

}

exports.Destroys = async (req, res, next) => {

    if(req.params.id){

        const _destroy = await serviceContent.Destroys(
            req.params.id,
        )

        res.status(200).json({
            _destroy
        })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}