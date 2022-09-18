const database = require('../config/database');
const modelCaller = require('../database/models/modelNotification');
const fs = require('fs');
const global = require('../main');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');


exports.Create = async (
    notification
) => {
    try {

        const created = await modelCaller.create({
            notification
        })

        return created;

    } catch (error) {
        console.log(error);
    }
}



