const express = require('express');
const router = express.Router();
const controlContent = require('../controller/controllerArea');
const passport    = require('passport');

//AUTH MIDDLEWARE
// const authenticate = require('../middlewares/middlewareAuth');

let pathRoute = 'area';

router.post(`/${pathRoute}/create`, controlContent.Create);
router.get(`/${pathRoute}`, /*passport.authenticate('jwt', {session: false}),*/ controlContent.Gets);
router.get(`/${pathRoute}/file`, controlContent.GetFile);
router.get(`/${pathRoute}/:id`, controlContent.GetThis);
router.put(`/${pathRoute}/update/:id`, controlContent.Updates);
router.delete(`/${pathRoute}/delete/:id`, controlContent.Destroys);

module.exports = router;