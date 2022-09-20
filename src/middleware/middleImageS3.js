const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const CryptoJS = require('crypto-js');
const aws = require('../utils/s3connection');

const FILE_SIZE = 2 * 1024 * 1024 * 2048;
const NUMBER_OF_BYTES = 16;

const storageTypes = {
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.BUCKET_NAME + '/files',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(NUMBER_OF_BYTES, (err, hash) => {
                if(err) cb(err);

                const fileName = CryptoJS.MD5(file.originalname) + '_' + file.originalname;

                cb(null, fileName);
            });
        }
    })
}

const config = {
    storage: storageTypes['s3'],
    limits: {
        fileSize: FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/svg+xml',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/*'
        ];

        allowedMimes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
    }
}

const upload = multer(config);

module.exports = upload;