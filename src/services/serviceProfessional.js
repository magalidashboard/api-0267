const database = require('../config/database');
const modelCaller = require('../database/models/modelProfessional');
const modelUser = require('../database/models/modelUser');
const fs = require('fs');
const global = require('../main');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { create } = require('domain');


exports.Create = async (
    name,
    rg,
    cpf,
    cnpj,
    cellphone,
    email,
    address,
    documents
) => {
    try {

        const created = await modelCaller.create({
            name,
            rg,
            cpf,
            cnpj,
            cellphone,
            email,
            address,
            documents
        });

        let hashpass = bcrypt.hashSync(cpf);

        const createUser = await modelUser.create({
            email,
            nickname: email,
            password: hashpass,
            role: '2234'
        })

        this.GetFile();

        return { created, createUser };

    } catch (error) {
        console.log(error);
    }
}

exports.Gets = async () => {
    try {

        const gets = await modelCaller.findAll();
        const users = await modelUser.findAll({
            where: {
                role:{
                    [Op.eq]: '2234'
                }
            }
        });

        let professionals = [gets, users].sort((a, b) => {
            if (a.id < b.id)
                return -1;
            if (a.id > b.id)
                return 1;
            return 0;
        });

        this.GetFile();

        return professionals;

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
        let files = global.globalDir + '/files/_database_backup_professional.json';
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

exports.GetThis = async (id) => {
    try {

        const gethis = await modelCaller.findByPk(id)
            .then(_this => {
                if(!_this) {
                    return 'Not found';
                }

            return _this;
        });

        return gethis;


    } catch (error) {
        console.log(error);
    }
}


exports.Updates = async (
    id,
    name = undefined,
    rg = undefined,
    cpf = undefined,
    cnpj = undefined,
    cellphone = undefined,
    email = undefined,
    address = undefined,
    documents = undefined
) => {
    try {

        const find = await modelCaller.findByPk(id)
            .then(async _find => {

                if (!_find) {
                    return 'nothing found';
                }

                name != undefined ? _find.update({ name: name }) : null;
                rg != undefined ? _find.update({ rg: rg }) : null;
                cpf != undefined ? _find.update({ cpf: cpf }) : null;
                cnpj != undefined ? _find.update({ cnpj: cnpj }) : null;
                address != undefined ? _find.update({ address: address }) : null;
                complement_address != undefined ? _find.update({ complement_address: complement_address }) : null;
                cellphone != undefined ? _find.update({ cellphone: cellphone }) : null;
                email != undefined ? _find.update({ email: email }) : null;
                documents != undefined ? _find.update({ documents: documents }) : null;

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
            .then(async _find => {

                if (!_find) return 'nothing found';

                _find.destroy();
                return `deleted`;
            });

        this.GetFile();

        return find;

    } catch (error) {
        console.log(error);
    }
}

exports.DestroyUser = async (id) => {
    try {

        const find = await modelUser.findByPk(id)
        .then(async _find => {

            if (!_find) return 'nothing found';

            _find.destroy();
            return `deleted`;
        });

        this.GetFile();

        return find;
    } catch (error) {
        console.log(error);
    }
}

