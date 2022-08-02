const express = require('express');
const router = express.Router();
const controlContent = require('../controller/controllerMediaS3');
const middleImageS3 = require('../middleware/middleImageS3');

router.post('/register/image', middleImageS3.single('image'), controlContent.uploadMediaImage);
router.get('/list/image', controlContent.getAllMedia);

module.exports = router;