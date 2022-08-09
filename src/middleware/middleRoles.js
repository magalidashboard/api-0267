const modelCaller = require('../database/models/modelUser');

exports.roleUser = async (req, res, next) => {

    let { email, username, password, role } = req.body;

    if(username == null){
        res.status(403)
        return res.send('É necessário um nome de usuário');
    }

    next();
}