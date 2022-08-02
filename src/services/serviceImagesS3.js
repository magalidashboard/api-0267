const aws = require('../utils/s3connection');
const s3 = new aws.S3();

const folder = '/learn';
const prefix = 'learn/'

exports.getAllMedias = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        try{
            let params = {
                Bucket: process.env.BUCKET_NAME,
                MaxKeys: 1000,
                Prefix: prefix,
                Delimiter: prefix
            };

            const allKeys = [];
            listAllKeys();

            function listAllKeys() {
                s3.listObjectsV2(params, (err, data) => {
                    if(err) {
                        reject(err);
                    } else {
                        let contents = data.Contents;
                        contents.forEach(content => {
                            allKeys.push(content.Key);
                        });

                        if(data.IsTruncated){
                            params.ContinuationToken = data.NextContinuationToken;
                            console.warn('get further list...');
                            listAllKeys();
                        } else {
                            resolve(allKeys);
                        }
                    }
                });
            }
        }
        catch(e){
            reject(e);
        }
    });
}