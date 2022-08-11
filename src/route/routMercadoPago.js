const express = require('express');
const router = express.Router();
const controlContent = require('../controller/controllerMercadoPago');
const passport    = require('passport');

let pathRoute = 'mercadopago';

router.get('/publicmp', controlContent.getPublicKey);
router.post(`/${pathRoute}/create`, passport.authenticate('jwt', {session: false}), controlContent.Create);
router.get(`/${pathRoute}`, controlContent.Gets);
router.get(`/${pathRoute}/file`, controlContent.GetFile);
router.get(`/payment/mercadopago/:id`, controlContent.GetThis);
router.delete(`/${pathRoute}/delete/:id`, controlContent.Destroys);

module.exports = router;