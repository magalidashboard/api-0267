const serviceContent = require('../services/serviceArea');

exports.Gets = async (req, res, next) => {

    const gets = await serviceContent.Gets();

    if(gets.length > 0){
        res.status(200).json({
            gets
        })
        return;
    }

    res.status(400).json({
        error: 'we couldn`t find any'
    })

}

exports.GetFile = async (req, res, next) => {
    const gets = await serviceContent.GetFile();

    if(gets.length > 0){
        res.status(200).json({
            gets
        })
        return
    }

    res.status(400).json({
        error: 'File *.json doens`t exists'
    })

}

exports.Create = async (req, res, next) => {
    let { areaType, areaChoose, areaDoc } = req.body;

    if(![areaType, areaChoose, areaDoc].includes(undefined)){

        await serviceContent.Create(areaType, areaChoose, areaDoc)
        res.status(200).json({ areaType, areaChoose, areaDoc })

        return;
    }

    if([areaType, areaChoose, areaDoc].includes('')){
        if(Object.keys(req.body).length == 0){
            res.status(400).json({
                error: 'empty data'
            })
        } else {
            res.status(400).json({
                error: req.body
            })
        }
    }

}

exports.Updates = async (req, res, next) => {
    let { areaType, areaChoose, areaDoc } = req.body;

    if(req.params.id && areaType != undefined || areaChoose != undefined || areaDoc != undefined){

        await serviceContent.Updates( req.params.id, areaType, areaChoose, areaDoc )
        res.status(200).json({ reaTypem, areaChoose, areaDoc })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}

exports.GetThis = async (req, res, next) => {

    if(req.params.id){

        const gets = await serviceContent.GetThis(
            req.params.id,
        )

        res.status(200).json({
            gets
        })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}

exports.Destroys = async (req, res, next) => {

    if(req.params.id){

        const _destroy = await serviceContent.Destroys(
            req.params.id,
        )

        res.status(200).json({
            _destroy
        })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}