const express = require('express');
const router = express.Router();

const controlContent = require('../controller/controllerAdminUser');

const pathRoute = '/admin';

router.post(`${pathRoute}/register`, controlContent.createUser);
router.get(`${pathRoute}/users`, controlContent.getUsers);
router.get(`${pathRoute}/user/:id`, controlContent.getThisUser);
router.put(`${pathRoute}/user/update/:id`, controlContent.updateThisUser);
router.delete(`${pathRoute}/user/delete/:id`, controlContent.destroyThisUser);

module.exports = router;