const serviceContent = require('../services/serviceImagesS3');

exports.getAllMedia = async (req, res, next) => {

    const listStream = await serviceContent.getAllMedias();

    if(listStream.length > 0) {
        res.status(200).json({
            listStream
        });
    } else {
        res.status(400).json({
            error: 'No images on bucket'
        });
    }

}

exports.uploadMediaImage = async (req, res, next) => {

    if(req.file) {
        const { key, location } = req.file;
        res.status(200).json({
            key,
            location
        });
        return;
    }

    res.status(400).json({
        error: 'We can`t send this image'
    });

}