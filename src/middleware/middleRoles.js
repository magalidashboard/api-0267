const modelUser = require('../database/models/modelUser');
const modelRoles = require('../database/models/modelRoles');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

exports.roleUser = async (req, res, next) => {

    let { email, username, password } = req.body;

    if(username == null || username == ''){
        res.status(403)
        return res.send('É necessário um nome de usuário');
    }

    if(password == null || password == ''){
        res.status(403)
        return res.send('É necessário uma senha');
    }

    try {

        let getUser = await modelUser.findOne({
            where: {
                nickname: username
            }
        })

        if(getUser != null) {
            let getRole = await modelRoles.findOne({
                where: {
                    roleAcess: getUser.dataValues.role
                }
            });
        } else {
            res.status(403)
            return res.send('Usuário não cadastrado')
        }

        //console.log(getRole.dataValues.roleAcess == getUser.dataValues.role)

    } catch (error) {
        console.log(error, 'userRole')
    }

    next();
}