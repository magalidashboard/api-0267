const express = require('express');
const router = express.Router();
const controlContent = require('../controller/controllerReducedLeads');
const controlMedia = require('../controller/controllerMediaImages');
const middleImage = require('../middleware/middlewareMediaImages');
const passport    = require('passport');

//AUTH MIDDLEWARE
// const authenticate = require('../middlewares/middlewareAuth');

let pathRoute = 'pre/register';

router.post(`/${pathRoute}/images`, middleImage.fields([{name: 'resume', maxCount: 2}, {name: 'registerdocs', maxCount: 4}]), (req, res) => { res.status(200).json({ files: req.files, file: req.file }) });
router.post(`/${pathRoute}/create`, controlContent.Create);
router.get(`/${pathRoute}`, /*passport.authenticate('jwt', {session: false}),*/ controlContent.Gets);
router.get(`/${pathRoute}/file`, controlContent.GetFile);
router.get(`/${pathRoute}/:id`, controlContent.GetThis);
router.get(`/${pathRoute}/:username/:pass`, controlContent.GetThisByPassUser);
router.put(`/${pathRoute}/update/:id`, controlContent.Updates);
router.delete(`/${pathRoute}/delete/:id`, controlContent.Destroys);

module.exports = router;