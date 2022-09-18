const express = require('express');
const router = express.Router();
const controlContent = require('../controller/controllerNotification');
//const passport    = require('passport');

//AUTH MIDDLEWARE
// const authenticate = require('../middlewares/middlewareAuth');

let pathRoute = 'status';

router.post(`/${pathRoute}/notification/asaas/webhook`, controlContent.Create);
router.get(`/${pathRoute}`, /*passport.authenticate('jwt', {session: false}),*/ controlContent.Gets);
router.get(`/${pathRoute}/file`, controlContent.GetFile);
router.get(`/${pathRoute}/:id`, controlContent.GetThis);
// router.get(`/${pathRoute}/user/:username`, controlContent.GetThisByPassUser);
router.put(`/${pathRoute}/update/:id`, controlContent.Updates);
router.delete(`/${pathRoute}/delete/:id`, controlContent.Destroys);

module.exports = router;