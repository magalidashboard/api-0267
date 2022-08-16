const database = require('../config/database');
const { Op } = require('sequelize');
const modelCaller = require('../database/models/modelPayment');
const modelSettings = require('../database/models/modelSettings');
const modelExtract = require('../database/models/modelExtract');
const modelLead = require('../database/models/modelLead');
const fs = require('fs');
const global = require('../main');
const serviceMP = require('../services/serviceMercadoPago');

exports.Create = async (
    payment_id,
    extract_id,
    payment_detail,
    price,
    cpf,
    name,
    type_payment,
    expires_date,
    professionalEmail
    ) => {
    try {

        const getTax = await modelSettings.findAll();
        const getUser = await modelLead.findAll({
            where: {
                [Op.or]: [{ cpf: cpf }, {cnpj: cpf}]
            }
        });


        let tax_by_percentage = getTax[0].dataValues.tax/100;
        let price_by_tax = Number(tax_by_percentage) * Number(price);
        price = Number(price) + Number(price_by_tax);

        const mpresponse = await serviceMP.createPaymentPreference(`#${payment_id}: ${payment_detail}`, price);

        let prefix =  `extract_${extract_id}`;

        const createTitle = await modelCaller.create({
            payment_id,
            extract_id: prefix,
            payment_detail,
            tax: tax_by_percentage,
            price,
            cpf,
            name,
            type_payment,
            expires_date,
            email: getUser[0].dataValues.email,
            professional_email: professionalEmail,
            link_payment: mpresponse.init_point,
            payment_id: mpresponse.id_point,
            status: 'PENDENTE'
        });

        const createExtract = await modelExtract.create({
            extract_id: prefix,
            email: getUser[0].dataValues.email,
            name,
            payment_link: mpresponse.init_point,
            payment_id: mpresponse.id_point,
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

