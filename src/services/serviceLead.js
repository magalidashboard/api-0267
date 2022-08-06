const database = require('../config/database');
const modelCaller = require('../database/models/modelLead');
const fs = require('fs');
const global = require('../main');
const { Op } = require('sequelize');


exports.Create = async (
    name,
    cep,
    cnpj,
    address,
    complement_address,
    cellphone,
    email,
    documents,
    galery_store,
    store_address,
) => {
    try {

        const created = await modelCaller.create({
            name,
            cep,
            cnpj,
            address,
            complement_address,
            cellphone,
            email,
            documents,
            galery_store,
            store_address,
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
    cep = undefined,
    cnpj = undefined,
    address = undefined,
    complement_address = undefined,
    cellphone = undefined,
    email = undefined,
    documents = undefined,
    galery_store = undefined,
    store_address = undefined,
) => {
    try {

        const find = await modelCaller.findByPk(id)
            .then(async _find => {

                if (!_find) {
                    return 'nothing found';
                }

                name != undefined ? _find.update({ name: name }) : null;
                cep != undefined ? _find.update({ cep: cep }) : null;
                cnpj != undefined ? _find.update({ cnpj: cnpj }) : null;
                address != undefined ? _find.update({ address: address }) : null;
                complement_address != undefined ? _find.update({ complement_address: complement_address }) : null;
                cellphone != undefined ? _find.update({ cellphone: cellphone }) : null;
                email != undefined ? _find.update({ email: email }) : null;
                documents != undefined ? _find.update({ documents: documents }) : null;
                galery_store != undefined ? _find.update({ galery_store: galery_store }) : null;
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
        //const connection = await database.sync();

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

