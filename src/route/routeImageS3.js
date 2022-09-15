const express = require('express');
const router = express.Router();
const controlContent = require('../controller/controllerMediaS3');
const middleImageS3 = require('../middleware/middleImageS3');

router.post('/register/image', middleImageS3.fields([{name: 'store', maxCount: 30}, {name: 'docs', maxCount: 30}]), controlContent.uploadMediaImage);
router.post('/register/professional/image', middleImageS3.fields([{ name: 'professional', maxCount: 30 }]), controlContent.uploadMediaImage);
router.get('/list/image', controlContent.getAllMedia);

module.exports = router;