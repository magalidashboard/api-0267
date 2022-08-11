const database = require('../config/database');
const { Op } = require('sequelize');
const modelCaller = require('../database/models/modelPayment');
const modelSettings = require('../database/models/modelSettings');
const fs = require('fs');
const global = require('../main');

exports.Create = async (
    payment_id,
    extract_id,
    payment_detail,
    tax,
    price,
    cpf,
    professionalEmail
    ) => {
    try {

        const getTax = await modelSettings.findAll();

        let tax_by_percentage = getTax[0].dataValues.tax/100;
    
        return tax_by_percentage;

        // const createTitle = await modelCaller.create({
        //     payment_id,
        //     extract_id,
        //     payment_detail,
        //     tax,
        //     price,
        //     cpf,
        //     professionalEmail
        // });

        this.GetFile();

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

