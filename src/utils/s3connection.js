const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
    accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
    bucket: process.env.BUCKET_NAME,
});

module.exports = aws;