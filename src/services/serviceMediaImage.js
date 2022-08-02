const aws = require('../utils/s3connection');
const s3 = new aws.S3();
const folder = '/media';
const prefix = 'media/';

exports.getMediaImage = async (fileKey) => {

    const downloadParams = {
      Key: fileKey,
      Bucket: process.env.BUCKET_NAME + folder,
    }

    return await s3.getObject(downloadParams).createReadStream()

}

exports.deleteMediaImage = async (fileKey) => {
    const deleteParams = {
        Key: fileKey,
        Bucket: process.env.BUCKET_NAME + folder,
    }

    return await s3.deleteObject(deleteParams).promise()
}

exports.getAllMediaImage = async (req, res, next) => {

    return new Promise((resolve, reject) => {
        try {
          let params = {
            Bucket: process.env.BUCKET_NAME,
            MaxKeys: 1000,
            Prefix: prefix,
            Delimiter: prefix
          };
          const allKeys = [];
          listAllKeys();
          function listAllKeys() {
            s3.listObjectsV2(params, function (err, data) {
              if (err) {
                reject(err)
              } else {
                var contents = data.Contents;
                contents.forEach(function (content) {
                  allKeys.push(content.Key);
                });
    
                if (data.IsTruncated) {
                  params.ContinuationToken = data.NextContinuationToken;
                  console.log("get further list...");
                  listAllKeys();
                } else {
                  resolve(allKeys);
                }
              }
            });
          }
        } catch (e) {
          reject(e);
        }
    
    });
}

