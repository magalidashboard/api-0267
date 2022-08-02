const database = require('../config/database');
const modelCaller = require('../database/models/modelLeadApproved');
const fs = require('fs');
const global = require('../main');


exports.Create = async (
    id, 
    hasApproved
    ) => {
    try {

        const created = await modelCaller.create({
            id, 
            hasApproved
        });

        this.getFileTitles();

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
        let files = global.globalDir+'/files/_database_backup_leads_approved.json';
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

exports.Updates = async (
        id, 
        hasApproved
    ) => {
    try { 
  //const connection = await database.sync();

        const find = await modelCaller.findByPk(id)
            .then( async _find => {

                if(!_find){
                    return 'nothing found';
                }

                id != undefined ? _find.update({id: id}) : null;            
                hasApproved != undefined ? _find.update({hasApproved: hasApproved}) : null;

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

