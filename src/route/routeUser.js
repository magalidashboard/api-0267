const express = require('express');
const router = express.Router();

const controlContent = require('../controller/controllerUser');

router.post('/register', controlContent.createUser);
router.get('/users', controlContent.getUsers);
router.get('/user/:id', controlContent.getThisUser);
router.put('/user/update/:id', controlContent.updateThisUser);
router.delete('/user/delete/:id', controlContent.destroyThisUser);

module.exports = router;