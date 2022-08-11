const mercadopago = require('../utils/mpconnection');
const database = require('../config/database');
const modelSettings = require('../database/models/modelSettings');
// const statusBuy = require('../database/model/modelMPstatusBuy');
// const mpOrder = require('../database/model/modelMPOrder');
// const mpOrderPix = require('../database/model/modelMPPixOrder');
// const axios = require('axios').default;

//mercadopago.connect();

exports.getPublic = async () => {
    try {
        const getPublic = await modelSettings.findAll();
        return getPublic;
    } catch (error) {
        console.log(error);
    }
}

exports.createPaymentPreference = async (title, unit_price) => {
    let preference = {
        items: [
            {
                title,
                unit_price: Number(unit_price),
                quantity: 1
            }
        ]
    };

    const mpPreference = await mercadopago.preferences.create(preference)
        .then(response => {
            return response.body.init_point;
        }).catch(error => console.log(error));

    return mpPreference;

}