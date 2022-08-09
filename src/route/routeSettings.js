const express = require('express');
const router = express.Router();

const controlContent = require('../controller/controllerSettings');

let path = '/settings';

router.post(`${path}/register`, controlContent.create);
router.get(`${path}`, controlContent.gets);
router.get(`${path}/:id`, controlContent.gethis);
router.put(`${path}/update/:id`, controlContent.updatethis);
router.delete(`${path}/delete/:id`, controlContent.destroythis);

module.exports = router;