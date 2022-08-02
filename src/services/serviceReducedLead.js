const database = require('../config/database');
const modelCaller = require('../database/models/modelReducedLead');
const fs = require('fs');
const global = require('../main');
const { Op } = require('sequelize');


exports.Create = async (
    name, 
    birthDate, 
    password, 
    age,
    regDoc,
    profession,
    cellphone,
    email,
    areaChooseID,
    documents,
    hasBusiness,
    terms
    ) => {
    try {
        const created = await modelCaller.create({
            name, 
            username: email,
            birthDate, 
            password, 
            age,
            regDoc,
            profession,
            cellphone,
            email,
            areaChooseID,
            documents,
            hasBusiness,
            terms
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
        let files = global.globalDir+'/files/_database_backup_Reducedleads.json';
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

exports.GetThisByPassUser = async (pass, username) => {
    try {

        const find = await modelCaller.findOne({
            where: {
                [Op.and]: [
                  { password: pass },
                  { name: username }
                ]
              }
        }).then(_find => {
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
        name = undefined, 
        birthDate = undefined,  
        password = undefined,  
        age = undefined, 
        regDoc = undefined,
        profession = undefined, 
        cellphone = undefined, 
        email = undefined, 
        areaChooseID = undefined,
        documents = undefined,
        hasBusiness = undefined,
        terms = undefined
    ) => {
    try { 

        const find = await modelCaller.findByPk(id)
            .then( async _find => {

                if(!_find){
                    return 'nothing found';
                }

                name != undefined ? _find.update({name: name}) : null;            
                birthDate != undefined ? _find.update({birthDate: birthDate}) : null;     
                password != undefined ? _find.update({password: password}) : null;      
                age != undefined ? _find.update({age: age}) : null;     
                regDoc != undefined ? _find.update({regDoc: regDoc}) : null;
                profession != undefined ? _find.update({profession: profession}) : null;     
                cellphone != undefined ? _find.update({cellphone: cellphone}) : null;     
                email != undefined ? _find.update({email: email}) : null;     
                areaChooseID != undefined ? _find.update({areaChooseID: areaChooseID}) : null;
                documents != undefined ? _find.update({documents: documents}) : null;
                hasBusiness != undefined ? _find.update({hasBusiness: hasBusiness}) : null;
                terms != undefined ? _find.update({terms: terms}) : null;     
      
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

