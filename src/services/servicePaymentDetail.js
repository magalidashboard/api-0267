const database = require('../config/database');
const { Op } = require('sequelize');
const modelCaller = require('../database/models/modelPayment');
const modelSettings = require('../database/models/modelSettings');
const modelExtract = require('../database/models/modelExtract');
const modelLead = require('../database/models/modelLead');
const fs = require('fs');
const global = require('../main');
const serviceMP = require('../services/serviceMercadoPago');
const CryptoJS  = require('crypto-js');
const axios = require('axios').default;

exports.Create = async (
    payment_id,
    payment_detail,
    price,
    cpf,
    name,
    professionalEmail
    ) => {
    try {

        const getTax = await modelSettings.findAll();
        const getUser = await modelLead.findOne({
            where: {
                [Op.or]: [{ cpf: cpf }, {cnpj: cpf}, { name: name }]
            }
        });


        let tax_by_percentage = getTax[0].dataValues.tax/100;
        let price_by_tax = Number(tax_by_percentage) * Number(price);
        price = Number(price) + Number(price_by_tax);

        //const mpresponse = await serviceMP.createPaymentPreference(`#${payment_id}: ${payment_detail}`, price);
        let cript = encodeURIComponent(CryptoJS.DES.encrypt(getUser.dataValues.email, 'payment'));
        //let payment_cript = encodeURIComponent(CryptoJS.DES.encrypt(price, 'payment'));
        //let replace = cript.replaceAll('/', '_');

        let prefix =  `extract_${payment_id}`;
        let payment_url = `payment/${getUser.dataValues.id}/${payment_id}/${price}/${cript}`;

        const createTitle = await modelCaller.create({
            payment_id,
            extract_id: prefix,
            payment_detail,
            tax: tax_by_percentage,
            price,
            client_id: getUser.dataValues.id,
            cpf: getUser.dataValues.cpf != '' ? getUser.dataValues.cpf : getUser.dataValues.cnpj,
            name,
            type_payment: null,
            expires_date: getTax[0].dataValues.expire_day,
            email: getUser.dataValues.email,
            professional_email: professionalEmail,
            link_payment: payment_url,
            status: 'PENDENTE',
            whatsapp_status: 'PENDENTE',
            asaas_payment_id: null,
            asaas_customer_id: null
        });

        const createExtract = await modelExtract.create({
            extract_id: prefix,
            client_id: getUser.dataValues.id,
            email: getUser.dataValues.email,
            name,
            payment_link: payment_url,
            payment_id,
            status: 'PENDENTE'
        })

        this.GetFile();

        return { createTitle, createExtract };

    } catch (error) {
        console.log(error);
    }
}

exports.updatethis = async (
    paymentid,
    status = undefined, 
    type_payment = undefined, 
    whatsapp_status = undefined
) => {
    try{
        const updatethis = await modelCaller.findOne({
            where: {
                [Op.or]: [{ payment_id: paymentid }]
            }
        })
        .then(async _this => {
            if(!_this){
                return 'Not found';
            }

            status != undefined ? _this.update({ status: status }) : '';
            whatsapp_status != undefined ? _this.update({ whatsapp_status: whatsapp_status }) : '';
            type_payment != undefined ? _this.update({ type_payment: type_payment }) : '';

            const _save = await _this.save();
            return _save;

        });
    
        return updatethis;
    }
    catch(err){
        console.log(err)
    }

}

exports.PreferenceSearch = async (id) => {
    try {
        const mpayments = await serviceMP.getThisPreference(id);
        return mpayments;
    } catch (error) {
        console.log(error)
    }
}

exports.PaymentSearch = async (id) => {
    try {
        const mpayments = await serviceMP.getThisPayment(id);
        return mpayments;
    } catch (error) {
        console.log(error)
    }
}

exports.ExtractSearch = async (extract) => {
    try {
        const getExtract = await modelExtract.findAll({
            where: {
                [Op.or]: [{ extract_id: extract }]
            }
        });

        return getExtract;
    } catch (error) {
        console.log(error);
    }
}

exports.ExtractPaymentId = async (payment_id) => {
    try {
        const getExtract = await modelCaller.findAll({
            where: {
                [Op.or]: [{ payment_id: payment_id }]
            }
        });

        return getExtract;
    } catch (error) {
        console.log(error);
    }
}

exports.Gets = async () => {
    try {

        const gets = await modelCaller.findAll();

        this.GetFile();

        return gets.sort((a, b) => {
            if (a.id < b.id)
              return -1;
            if (a.id > b.id)
              return 1;
            return 0;
        });

    } catch (error) {
        console.log(error);
    }
}

exports.GetFile = async () => {
    try {
        const gets = await modelCaller.findAll();

        gets.sort((a, b) => {
            if (a.id < b.id)
              return -1;
            if (a.id > b.id)
              return 1;
            return 0;
        });

        let treatObject = JSON.stringify(gets);
        let files = global.globalDir+'/files/paymentDoc.json';

        fs.writeFile(files, treatObject, 'utf8', (err) => {
            if(err){
                console.log(err)
            }
        });
        

        return gets;

    } catch (error) {
        console.log(error)
    }
}

exports.GetThis = async (_payment) => {
    try {

        const find = await modelCaller.findAll({
            where: {
                payment_id: {
                    [Op.eq]: _payment
                }
            },
        });

        return find;

    } catch (error) {
        console.log(error);
    }
}

exports.Destroys = async (_payment) => {
    try {
        const find = await modelCaller.findAll({
            where: {
                payment_id: {
                    [Op.eq]: _payment
                }
            }
        }).then(_find => {
                if(!_find){
                    return 'nothing found';
                }

                _find.destroy();
                return `${_find} deleted`;
        });

        this.GetFile();

        return find;

    } catch (error) {
        console.log(error);
    }
}

exports.destroyPayments = async (id) => {
    try {

        const findPay = await modelCaller.findByPk(id)
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

exports.createPaymentAsaas = async (
        id,
        customer, 
        billingType, 
        value, 
        dueDate, 
        creditCardHolderInfo = undefined, 
        description = undefined, 
        name = undefined, 
        email = undefined, 
        cpfCnpj = undefined, 
        postalCode = undefined, 
        addressNumber = undefined, 
        phone = undefined, 
        creditCard = undefined, 
        holderName = undefined, 
        number = undefined, 
        expiryMonth = undefined, 
        expiryYear = undefined, 
        ccv = undefined
    ) => {
    try {
        
        const _settings = await modelSettings.findAll();
        await modelCaller.findByPk(id).then(async _this => {
            if(!_this){
                return 'Not found';
            }

            _this.update({ status: 'EM ANÁLISE' });
            _this.update({ type_payment: billingType });

            await _this.save();

        });

        if(creditCardHolderInfo != undefined && creditCard != undefined){
            json = {
                customer,
                billingType,
                dueDate,
                value,
                creditCardHolderInfo: {
                  description,
                  name,
                  email,
                  cpfCnpj,
                  postalCode,
                  addressNumber,
                  phone
                },
                creditCard:{
                  holderName,
                  number,
                  expiryMonth,
                  expiryYear,
                  ccv
                },
            }

        } else {
            json = {
                customer,
                billingType,
                dueDate,
                value
            }
        }

        let header = {
            'content-type': 'application/json',
            'access_token': _settings[0].dataValues.asaas_api
        }

        const asaas_id = await axios.post(`${process.env._ASAAS_URL}/payments`, json, {headers: header})
        .then(async _response => {
            return _response;
        }).catch(_error => {
            console.log(_error)
        })
        
        await modelCaller.findByPk(id).then(async _this => {
            if(!_this){
                return 'Not found';
            }

            _this.update({ asaas_customer_id: asaas_id?.data.customer });

            await _this.save();

        });

        return asaas_id?.data;

    } catch (error) {
        console.log(error);
    }
}

exports.createWebhookAsaas = async () => {

    try {

        const _settings = await modelSettings.findAll();

        let header = {
            'content-type': 'application/json',
            'access_token': _settings[0].dataValues.asaas_api
        }

        let json = {
            url: _settings[0].dataValues.notification,
            email: _settings[0].dataValues.notification_email,
            interrupted: false,
            enabled: true,
            apiVersion: 3
        }

        const payment_status = axios.post(`${process.env._ASAAS_URL}/webhook`, json, {headers: header})
        .then(async _result => {
            return _result;
        }).catch(_error => console.log(_error));

        return payment_status?.data;

    } catch (error) {
        console.log(error)
    }

}
