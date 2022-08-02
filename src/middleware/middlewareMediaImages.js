const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const cryptoJs = require('crypto-js');
const multerS3 = require('multer-s3');
const aws = require('../utils/s3connection');

//eslint-disable-next-line no-magic-numbers
const FILE_SIZE = 2*1024*1024*2048*50408;
const NUMBER_OF_BYTES = 16;

const storageTypes = {
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME + '/docs',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(NUMBER_OF_BYTES, (err, hash) => {
        if (err) cb(err);

        //let today = new Date().toLocaleDateString();

        const fileName = cryptoJs.MD5(file.originalname) + '_' + file.originalname;

        cb(null, fileName);
      });
    }
  })
};

const config = {
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: FILE_SIZE
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
};

const upload = multer(config);

module.exports = upload;