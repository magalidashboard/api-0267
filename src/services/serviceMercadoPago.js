const mercadopago = require('../utils/mpconnection');
const database = require('../config/database');
const modelSettings = require('../database/models/modelSettings');
const statusBuy = require('../database/models/modelMPstatusBuy');
const mpOrder = require('../database/models/modelMPOrder');
const mpOrderPix = require('../database/models/modelMPPixOrder');
const axios = require('axios').default;
const Settings = require('../database/models/modelSettings');

exports.getPublic = async () => {
    try {
        const getPublic = await modelSettings.findAll();
        return getPublic;
    } catch (error) {
        console.log(error);
    }
}

exports.createPaymentPreference = async (title, unit_price) => {

    const _settings = await Settings.findAll();
    await mercadopago.configurations.setAccessToken(_settings[0].dataValues.mercado_pago_token);

    let preference = {
        items: [
            {
                title,
                unit_price: Number(unit_price),
                quantity: 1
            }
        ],
        back_urls: {
            success: _settings[0].dataValues.mercado_pago_url_success,
            pending: _settings[0].dataValues.mercado_pago_url_pending,
            failure: _settings[0].dataValues.mercado_pago_url_failure,
        },
        notification_url: _settings[0].dataValues.mercado_pago_notification_url,
    };

    const mpPreference = await mercadopago.preferences.create(preference)
        .then(response => {
            let json = {
                init_point: response.body.init_point,
                id_point: response.body.id
            }
            return json;
        }).catch(error => console.log(error));

    return mpPreference;

}

exports.makePayment = async (paymentData) => {

    const mptreatment = mercadopago.payment.save(paymentData)
        .then(async response => {

            console.log(response)

            const { response: data } = response;
            const { id, transaction_amount, date_created, card } = data;
            const { first_six_digits, last_four_digits, cardholder } = card;

            try {
        
                const createStatusBuy = await statusBuy.create({
                    detail: data.status_detail,
                    status: data.status,
                    buyid: data.id
                });
                
                const createDataPayment = await mpOrder.create({
                    status: data.status,
                    purchase_order: id,
                    transaction_amount: transaction_amount,
                    date_approved: date_created,
                    first_six_digits: first_six_digits,
                    last_four_digits: last_four_digits,
                    display_name: cardholder.name
                });

                return response;
        
            } catch (error) {
                console.log(error);
            }

        }).catch(function(error) {

            return error;

        });

    return mptreatment;
        
}

exports.makePixPayment = async (paymentData) => {

    var payerName = paymentData.payer.first_name;

    
    const mptreatment = mercadopago.payment.create(paymentData)
        .then(async response => {

            const { response: data } = response;
            const { transaction_details, point_of_interaction } = data;
            const { net_received_amount, total_paid_amount, overpaid_amount, installment_amount } = transaction_details;
            const { transaction_data } = point_of_interaction;
            const { qr_code_base64, qr_code  } = transaction_data;

            console.log(data)

            try {
          //const connection = await database.sync();

                const createStatusBuy = await statusBuy.create({
                    detail: data.status_detail,
                    status: data.status,
                    buyid: data.id
                });
                
                const createDataPayment = await mpOrderPix.create({
                    first_name: payerName,
                    status: data.status,
                    purchase_order: data.id,
                    net_received_amount,
                    transaction_amount:total_paid_amount,
                    overpaid_amount,
                    installment_amount,
                    qr_code_base64,
                    qr_code,
                });

                return createDataPayment;
        
            } catch (error) {
                console.log(error);
            }

        }).catch(function(error) {

            return error;

        });

    return mptreatment;
        
}

exports.updatePixPayments = async (purchase_order, id) => {

    axios.defaults.headers.common = {
        Authorization: `Bearer ${process.env.MP_TOKEN}` 
    };

   const res = await axios.get(`https://api.mercadopago.com/v1/payments/${purchase_order}`);
    if(res.data.status){
        try { 
    
            const findPayment = await mpOrderPix.findByPk(id)
                .then( async pixPayment => {
    
                    if(!pixPayment){
                        return 'nothing found';
                    }
    
                    purchase_order != undefined ? pixPayment.update({status: res.data.status}) : '';
    
                    const savePayment = await pixPayment.save();
                    return savePayment;
                    
                });
                
            return findPayment;
    
        } catch (error) {
            console.log(error);
        }
    }
}

exports.getPayments = async () => {
    try {
  //const connection = await database.sync();
        const getPayments = await mpOrder.findAll();
        const getPixPayments = await mpOrderPix.findAll();

        const getAllPayments = getPayments.concat(getPixPayments)
        return getAllPayments;

    } catch (error) {
        console.log(error);
    }
}

exports.destroyPixPayments = async (id) => {
    try {

        const findPix = await mpOrderPix.findByPk(id)
            .then(destroyThisPay => {
                if(!destroyThisPay){
                    return 'nothing found';
                }

                destroyThisPay.destroy();
                return `Payment deleted`;
            });

        return findPix;

    } catch (error) {
        console.log(error);
    }

}

exports.destroyPayments = async (id) => {
    try {

        const findPay = await mpOrder.findByPk(id)
            .then(destroyThisPay => {
                if(!destroyThisPay){
                    return 'nothing found';
                }

                destroyThisPay.destroy();
                return `Payment deleted`;
            });

        return findPay;

    } catch (error) {
        console.log(error);
    }
    
}



