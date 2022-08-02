const express = require('express');
const router = express.Router();
const passport = require('passport');
const controlContent = require('../controller/controllerLogin');

router.post('/login', passport.authenticate('local'), controlContent.login);

module.exports = router;