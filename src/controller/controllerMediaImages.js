const serviceMediaImage = require('../services/serviceMediaImage');

exports.uploadMediaImage = async (req, res, next) => {
  
    if ( req.file ) {
      const { key, location } = req.file;
      (location) ? location : `we can't send this image`;
      res.send({imagePath: `/images/${key}`});
      return;
    }

    res.status(400).json({
        error: `we can't send this image`
    })

};

exports.getMediaImage = async (req, res, next) => {
  const key = req.params.key;
  if(key){
    const readStream = await serviceMediaImage.getMediaImage(key);
    readStream.pipe(res);
  }
}

exports.deleteMediaImage = async (req, res, next) => {
  const key = req.params.key;
  if(key){
    const deleted = await serviceMediaImage.deleteMediaImage(key);
    if(deleted){
      res.status(200).json({
        message: `success deleted image`,
      })
    }else {
      res.status(400).json({
        error: `image can't be deleted or doens't exists`
      })
    }
  }
}

exports.getAllMedia = async (req, res, next) => {
  const listStream = await serviceMediaImage.getAllMediaImage();
  res.status(200).json({
    listStream
  })
}
