const serviceContent = require('../services/serviceLeadApproved');

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
    let { 
        id, 
        hasApproved,
    } = req.body;

    if(![        
        id, 
        hasApproved
    ].includes(undefined)){

        await serviceContent.Create(
            id, 
            hasApproved
        )

        res.status(200).json({
            id, 
            hasApproved
        })

        return;
    }

    if([
        id, 
        hasApproved,
    ].includes('')){
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
    let { 
        id, 
        hasApproved,
     } = req.body;

    if(
        id != undefined ||
        hasApproved != undefined
        ){

        await serviceContent.Updates(
            req.params.id,
            hasApproved,
        )

        res.status(200).json({
            id, 
            hasApproved,
        })

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