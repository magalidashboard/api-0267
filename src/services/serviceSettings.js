const database = require('../config/database');
const modelCaller = require('../database/models/modelSettings');

exports.create = async (            
    mercado_pago_store, 
    mercado_pago_key, 
    mercado_pago_token, 
    pagseguro_id, 
    pagseguro_key, 
    pagseguro_public_key,  
    tax, 
    whatsapp_message) => {
    try {
        const create = await modelCaller.create({
            mercado_pago_store, 
            mercado_pago_key, 
            mercado_pago_token, 
            pagseguro_id, 
            pagseguro_key, 
            pagseguro_public_key, 
            tax, 
            whatsapp_message
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
                    return 'User not found';
                }

                return _this;
            });

        return gethis;

    }
    catch(err) {
        console.log(err)
    } 
}

exports.updatethis = async (
    id, 
    mercado_pago_store = undefined, 
    mercado_pago_key = undefined, 
    mercado_pago_token = undefined, 
    pagseguro_id  = undefined, 
    pagseguro_key  = undefined, 
    pagseguro_public_key  = undefined, 
    tax  = undefined,
    whatsapp_message = undefined) => {
    try{
        const updatethis = await modelCaller.findByPk(id)
        .then(async _this => {
            if(!_this){
                return 'Not found';
            }

            mercado_pago_store != undefined ? _this.update({ mercado_pago_store: mercado_pago_store }) : '';
            mercado_pago_key != undefined ? _this.update({ mercado_pago_key: mercado_pago_key }) : '';
            mercado_pago_token != undefined ? _this.update({ mercado_pago_token: mercado_pago_token }) : '';
            pagseguro_id != undefined ? _this.update({ pagseguro_id: pagseguro_id }) : '';
            pagseguro_key != undefined ? _this.update({ pagseguro_key: pagseguro_key }) : '';
            pagseguro_public_key != undefined ? _this.update({ pagseguro_public_key: pagseguro_public_key }) : '';
            tax != undefined ? _this.update({ tax: tax }) : '';
            whatsapp_message != undefined ? _this.update({ whatsapp_message: whatsapp_message }) : '';

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

