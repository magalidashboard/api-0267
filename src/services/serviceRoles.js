const database = require('../config/database');
const modelCaller = require('../database/models/modelRoles');

exports.create = async (roleName, roleAcess) => {
    try {
        const create = await modelCaller.create({
            roleName,
            roleAcess
        });
    }
    catch (err) {
        console.log(err)
    }
}

exports.gets = async () => {
    try{
        const gets = await modelCaller.findAll();
        return gets.sort((a, b) => {
            if (a.id < b.id)
                return -1;
            if (a.id > b.id)
                return 1;
            return 0;
        });
    }
    catch(err) {
        console.log(err)
    }
}

exports.gethis = async (id) => {
    try{

        const gethis = await modelCaller.findByPk(id)
            .then(_this => {
                if(!_this) {
                    return 'Not found';
                }

                return _this;
            });

        return gethis;

    }
    catch(err) {
        console.log(err)
    } 
}

exports.updatethis = async (id, roleAcess = undefined, roleName = undefined) => {
    try{
        const updatethis = await modelCaller.findByPk(id)
        .then(async _this => {
            if(!_this){
                return 'User not found';
            }

            roleName != undefined ? _this.update({ roleName: roleName }) : '';
            roleAcess != undefined ? _this.update({ roleAcess: roleAcess }) : '';

            const _save = await _this.save();
            return _save;

        });
    
        return updatethis;
    }
    catch(err){
        console.log(err)
    }

}

exports.destroythis = async (id) => {
    try {
        const destroythis = await modelCaller.findByPk(id)
            .then(_this => {
                if(!_this){
                    return 'Not found';
                }

                _this.destroy();
                return 'Deleted';
            });
        
        return destroythis;
        
    } 
    catch(err){
        console.log(err)
    }
}

