const database = require('../config/database');
const modelCaller = require('../database/models/modelLead');
const modelSettings = require('../database/models/modelSettings');
const fs = require('fs');
const global = require('../main');
require('dotenv').config();
const { Op } = require('sequelize');
const axios = require('axios').default;

exports.Create = async (
    name,
    rg,
    cep,
    cnpj,
    cpf,
    cellphone,
    email,
    address,
    cep_store,
    store_address,
    documents,
    galery_store,
    customer_id
) => {
    try {

        const _settings = await modelSettings.findAll();

        let json = {
            name,
            cpfCnpj: cpf != '' ? cpf : cnpj,
        }

        let header = {
            'content-type': 'application/json',
            'access_token': _settings[0].dataValues.asaas_api
        }

        let asaas_id = await axios.post(`${process.env._ASAAS_URL}/customers`, json, {headers: header})
        .then(_response => {
            return _response.data.id;
        }).catch(_error => {
            console.log(_error)
        })

        const created = await modelCaller.create({
            name,
            rg,
            cep,
            cnpj,
            cpf,
            cellphone,
            email,
            address,
            cep_store,
            store_address,
            documents,
            galery_store,
            customer_id: asaas_id
        });

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
        let files = global.globalDir + '/files/_database_backup_leads.json';
        fs.writeFile(files, treatObject, 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        });

        return gets;

    } catch (error) {
        console.log(error)
    }
}

exports.GetThis = async (id) => {
    try {

        const find = await modelCaller.findByPk(id)
            .then(_find => {
                if (!_find) {
                    return 'nothing found';
                }

                return _find;
            });

        return find;

    } catch (error) {
        console.log(error);
    }
}

exports.GetThisByPassUser = async (username) => {
    try {

        const find = await modelCaller.findOne({
            where: {
                [Op.and]: [
                    { name: username }
                ]
            }
        }).then(_find => {
            if (!_find) {
                return 'nothing found';
            }

            return _find;
        });

        return find;

    } catch (error) {
        console.log(error);
    }
}


exports.Updates = async (
    id,
    name = undefined,
    rg = undefined,
    cep = undefined,
    cnpj = undefined,
    cpf = undefined,
    cellphone = undefined,
    email = undefined,
    address = undefined,
    cep_store = undefined,
    store_address = undefined,
    documents = undefined,
    galery_store = undefined
) => {
    try {

        const find = await modelCaller.findByPk(id)
            .then(async _find => {

                if (!_find) {
                    return 'nothing found';
                }

                name != undefined ? _find.update({ name: name }) : null;
                rg != undefined ? _find.update({ rg: rg }) : null;
                cep != undefined ? _find.update({ cep: cep }) : null;
                cnpj != undefined ? _find.update({ cnpj: cnpj }) : null;
                cpf != undefined ? _find.update({ cpf: cpf }) : null;
                address != undefined ? _find.update({ address: address }) : null;
                complement_address != undefined ? _find.update({ complement_address: complement_address }) : null;
                cellphone != undefined ? _find.update({ cellphone: cellphone }) : null;
                email != undefined ? _find.update({ email: email }) : null;
                documents != undefined ? _find.update({ documents: documents }) : null;
                galery_store != undefined ? _find.update({ galery_store: galery_store }) : null;
                cep_store != undefined ? _find.update({ cep_store: cep_store }) : null;
                store_address != undefined ? _find.update({ store_address: store_address }) : null;

                const save = await _find.save();
                return save;

            });

        this.GetFile();

        return find;

    } catch (error) {
        console.log(error);
    }
}

exports.Destroys = async (id) => {
    try {
        const find = await modelCaller.findByPk(id)
            .then(_find => {
                if (!_find) {
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

