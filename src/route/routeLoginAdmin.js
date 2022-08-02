const express = require('express');
const router = express.Router();
const passport = require('passport');
const controlContent = require('../controller/controllerLoginAdmin');

router.post('/admin/login', passport.authenticate('local'), controlContent.login);

module.exports = router;