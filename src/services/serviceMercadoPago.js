const mercadopago = require('../utils/mpconnection');
const database = require('../config/database');
const modelSettings = require('../database/models/modelSettings');
// const statusBuy = require('../database/model/modelMPstatusBuy');
// const mpOrder = require('../database/model/modelMPOrder');
// const mpOrderPix = require('../database/model/modelMPPixOrder');
// const axios = require('axios').default;
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

exports.getThisPreference = async (id) => {

    const _settings = await Settings.findAll();
    mercadopago.configurations.setAccessToken(_settings[0].dataValues.mercado_pago_token);
    const mpGetPreference = await mercadopago.preferences.get(id);
    return mpGetPreference;

}

exports.getThisPayment = async (id) => {

    const _settings = await Settings.findAll();
    mercadopago.configurations.setAccessToken(_settings[0].dataValues.mercado_pago_token);
    const mpGetPreference = await mercadopago.payment.get(id);
    return mpGetPreference;

}
