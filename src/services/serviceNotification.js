const database = require('../config/database');
const modelCaller = require('../database/models/modelNotification');
const modelPayment = require('../database/models/modelPayment');
const { Op } = require('sequelize');

exports.Create = async (
    notification
) => {
    try {

        const created = await modelCaller.create({
            notification
        })

        let parse = JSON.parse(notifcation);
        
        await modelPayment.findOne({
            where: {
                [Op.or]: [{ asaas_payment_id: parse.payment.id }, {asaas_customer_id: parse.payment.customer}]
            }
        }).then(async _this => {
            if(!_this){
                return 'Not found';
            }

            _this.update({ status: parse.status });
            _this.update({ type_payment: parse.payment.billingType  });
            _this.update({ asaas_transaction_url: parse.transactionReceiptUrl });
            _this.update({ asaas_invoice_number: parse.invoiceNumber });

            await _this.save();

        });

        return created;

    } catch (error) {
        console.log(error);
    }
}





