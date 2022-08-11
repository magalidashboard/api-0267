var mercadopago = require('mercadopago');
const { Op } = require('sequelize');
const Settings = require('../database/models/modelSettings');

const _db_mp_token = async () => {
    try {
        const _settings = await Settings.findAll();
        return _settings[0].dataValues.mercado_pago_key;
    } catch (error) {
        console.log(error)
    }
}

const AcessToken = process.env.MP_TOKEN || _db_mp_token;

mercadopago.configurations.setAccessToken(AcessToken);

module.exports = mercadopago;