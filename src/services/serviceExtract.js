const { password } = require('pg/lib/defaults');
const database = require('../config/database');
const modelCaller = require('../database/models/modelExtract');

exports.Create = async (
    extract_id, 
    email, 
    payment_link, 
    payment_id, 
    status
) => {
    try {
        const create = await modelCaller.create({
            extract_id, 
            email, 
            payment_link, 
            payment_id, 
            status
        });
    }
    catch (err) {
        console.log(err)
    }
}

exports.Gets = async () => {
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

exports.GetThis = async (id) => {
    try{

        const getthis = await modelCaller.findByPk(id)
            .then(_this => {
                if(!_this) {
                    return 'User not found';
                }

                return _this;
            });

        return getthis;

    }
    catch(err) {
        console.log(err)
    } 
}

exports.UpdateThis = async (
    extract_id = undefined, 
    status = undefined
) => {
    try{
        const update = await modelCaller.findAll({
            where: {
                extract_id: extract_id
            }
        })
        .then(async _this => {
            if(!_this){
                return 'User not found';
            }

            status != undefined ? _this.update({ status: status }) : '';

            const save = await _this.save();
            return save;

        });
    
        return update;
    }
    catch(err){
        console.log(err)
    }

}

exports.DestroyThis = async (extract_id) => {
    try {
        const destroy = await modelCaller.findAll({
            where: {
                extract_id: extract_id
            }
        })
        .then(_this => {
                if(!_this){
                    return 'User not found';
                }

                _this.destroy();
                return 'User deleted';
            });
        
        return destroy;
        
    } 
    catch(err){
        console.log(err)
    }
}

