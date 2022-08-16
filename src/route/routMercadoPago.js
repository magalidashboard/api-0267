const express = require('express');
const router = express.Router();
const controlContent = require('../controller/controllerMercadoPago');
const passport    = require('passport');

let pathRoute = 'mercadopago';

router.get('/publicmp', controlContent.getPublicKey);
router.post(`/${pathRoute}/create`, /* passport.authenticate('jwt', {session: false}), */ controlContent.Create);
router.get(`/payments`, controlContent.Gets);
router.get(`/${pathRoute}/file`, controlContent.GetFile);
router.get(`/payment/mercadopago/:id`, controlContent.GetThis);
router.delete(`/${pathRoute}/delete/:id`, controlContent.Destroys);

//GET PREFERENCE
router.get(`/${pathRoute}/preference/:id`, controlContent.PreferenceSearch);

//GET PAYMENT
router.get(`/search/payment/:payment_id`, controlContent.GetPaymentId);

//GET EXTRACT
router.get('/extracts/:extract', controlContent.GetExtracts);

router.post('/payment', controlContent.makePaymentController);
router.post('/payment/pix', controlContent.makePixPaymentController);
router.post('/update/pix/status', controlContent.checkPixPayments);
router.get('/history/payments', controlContent.getPayments);
router.delete('/payment/pix/delete/:id', controlContent.destroyPixPayments);
router.delete('/payment/delete/:id', controlContent.destroyPayments);

module.exports = router;