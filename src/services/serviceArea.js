const database = require('../config/database');
const modelCaller = require('../database/models/modelArea');
const fs = require('fs');
const global = require('../main');


exports.Create = async (areaType, areaChoose, areaDoc) => {
    try {

        const created = await modelCaller.create({
            areaType,
            areaChoose,
            areaDoc
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
        let files = global.globalDir+'/files/_database_backup_areas.json';
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

exports.GetThis = async (id) => {
    try {

        const find = await modelCaller.findByPk(id)
            .then(_find => {
                if(!_find){
                    return 'nothing found';
                }

                return _find;
            });

        return find;

    } catch (error) {
        console.log(error);
    }
}

exports.Updates = async ( areaType = undefined, areaChoose = undefined, areaDoc = undefined ) => {
    try { 

        const find = await modelCaller.findByPk(id)
            .then( async _find => {

                if(!_find){
                    return 'nothing found';
                }

                areaChoose != undefined ? _find.update({areaChoose: areaChoose}) : null; 
                areaType != undefined ? _find.update({areaType: areaType}) : null; 
                areaDoc != undefined ? _find.update({areaDoc: areaDoc}) : null; 

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

