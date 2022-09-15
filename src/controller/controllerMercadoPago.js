const serviceMP = require('../services/serviceMercadoPago');
const serviceContent = require('../services/servicePaymentDetail');

exports.Create = async (req, res, next) => {
    let { payment_id, payment_detail, price, cpf, name, professionalEmail } = req.body;

    if(![payment_id, payment_detail, price, cpf, name, professionalEmail].includes(undefined)){
        let Payment = await serviceContent.Create(
            payment_id, payment_detail, price, cpf, name, professionalEmail
        )
    
        res.status(200).json({
            Payment
        })

        return;
    }

    if([payment_id, payment_detail, price, cpf, name, professionalEmail].includes('')){
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

exports.updatethis = async ( req, res, next ) => {

    let { status, type_payment, whatsapp_status } = req.body;
    let { paymentid } = req.params;

    if(
        status != undefined ||
        type_payment != undefined ||
        whatsapp_status != undefined 
        ) {

            await serviceContent.updatethis(
                paymentid,
                status, 
                type_payment,
                whatsapp_status
            );
        
            res.status(200).json({
                status, 
                type_payment,
                whatsapp_status
            });

        return;
    }

    res.status(400).json({
        error: 'Incorrect id'
    });

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

exports.GetExtracts = async (req, res, next) => {
    if(req.params.extract) {
        const gets = await serviceContent.ExtractSearch(
            req.params.extract
        )

        res.status(200).json({
            gets
        })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}

exports.GetPaymentId = async (req, res, next) => {
    if(req.params.payment_id) {
        const gets = await serviceContent.ExtractPaymentId(req.params.payment_id)

        res.status(200).json({
            gets
        })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}

exports.GetThis = async (req, res, next) => {

    if(req.params.id){

        const gets = await serviceContent.GetThis(
            req.params.id,
        )

        //const init_point = await serviceMP.createPaymentPreference(gets[0].dataValues.project, gets[0].dataValues.price);

        res.status(200).json({
            gets
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

        const _destroy = await serviceContent.destroyPayments(
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

exports.makePaymentController = async (req, res, next) => {

    const paymentData = {
        transaction_amount: Number(req.body.transactionAmount),
        token: req.body.token,
        description: 'Donate',
        installments: Number(req.body.installments),
        payment_method_id: req.body.paymentMethodId,
        issuer_id: req.body.issuerId,
        payer: {
          email: req.body.email,
          identification: {
            type: req.body.type,
            number: req.body.number
          }
        }
    };

    const makePayment = await mercadopagoService.makePayment(paymentData);

    if(!makePayment.cause){
        //console.log('success:', makePayment)
        res.status(200).json({
            makePayment
        });
    } else {
        //console.log('error:', makePayment)
        res.status(makePayment.status).json({
            code: makePayment.cause.code,
            error: makePayment.cause
        })
    }



}

exports.makePixPaymentController = async (req, res, next) => {

    const paymentData = {
        transaction_amount: Number(req.body.transactionAmount),
        payment_method_id: 'pix',
        description: 'Donate Pix',
        payer: {
          email: req.body.email,
          first_name: req.body.name,
          last_name: req.body.last_name,
          identification: {
            type: req.body.type,
            number: req.body.number
          },
          address: {
              zip_code: req.body.cep,
              street_name: req.body.street_name,
              street_number: req.body.street_number,
              neighborhood: req.body.neighborhood,
              city: req.body.city,
              federal_unit: req.body.state
          }
        }
    };

    const makePayment = await mercadopagoService.makePixPayment(paymentData);

    if(!makePayment.cause){
        //console.log('success:', makePayment)
        res.status(200).json({
            makePayment
        });
    } else {
        //console.log('error:', makePayment)
        res.status(makePayment.status).json({
            code: makePayment.cause.code,
            error: makePayment.cause
        })
    }



}

exports.checkPixPayments = async (req, res, next) => {

    const pix = await mercadopagoService.updatePixPayments(req.body.purchase_order, req.body.id);

    res.status(200).json({
        po: req.body.purchase_order,
        id: req.body.id,
        pix
    });

}

exports.getPayments = async (req, res, next) => {

    const getPayments = await mercadopagoService.getPayments();

    if(getPayments){
        res.status(200).json({
            getPayments
        })
        return;
    }

    res.status(400).json({
        error: 'we couldn`t find payments'
    })

}

exports.destroyPixPayments = async (req, res, next) => {

    if(req.params.id){

        const thisPayment = await mercadopagoService.destroyPixPayments(
            req.params.id,
        )

        res.status(200).json({
            thisPayment
        })

        return;
    }

    res.status(400).json({
        error: `wrong payment id or doens't exists`
    })
}

exports.destroyPayments = async (req, res, next) => {

    if(req.params.id){

        const thisPayment = await serviceContent.destroyPayments(
            req.params.id,
        )

        res.status(200).json({
            thisPayment
        })

        return;
    }

    res.status(400).json({
        error: `wrong payment id or doens't exists`
    })
}