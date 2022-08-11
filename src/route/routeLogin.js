const express = require('express');
const router = express.Router();
const passport = require('passport');
const controlContent = require('../controller/controllerLogin');
const { roleUser } = require('../middleware/middleRoles');

router.post('/login', roleUser, roleUser, passport.authenticate('local'), controlContent.login);

module.exports = router;