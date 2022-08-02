const serviceContent = require('../services/serviceLead');

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
        name, 
        birthDate,
        age,
        genre,
        completeAddress,
        profession,
        cellphone,
        email,
        maritalStatus,
        childrens,
        documents,
        areaChooseID,
        hasBusiness,
        partner,
        terms,
        regDoc
    } = req.body;

    if(![        
        name, 
        birthDate,
        age,
        genre,
        completeAddress,
        profession,
        cellphone,
        email,
        maritalStatus,
        childrens,
        documents,
        areaChooseID,
        hasBusiness,
        partner,
        terms,
        regDoc
    ].includes(undefined)){

        await serviceContent.Create(
            name, 
            birthDate,
            age,
            genre,
            completeAddress,
            profession,
            cellphone,
            email,
            maritalStatus,
            childrens,
            documents,
            areaChooseID,
            hasBusiness,
            partner,
            terms,
            regDoc
        )

        res.status(200).json({
            name, 
            birthDate,
            age,
            genre,
            completeAddress,
            profession,
            cellphone,
            email,
            maritalStatus,
            childrens,
            documents,
            areaChooseID,
            hasBusiness,
            partner,
            terms,
            regDoc
        })

        return;
    }

    if([
        name, 
        birthDate,
        age,
        genre,
        completeAddress,
        profession,
        cellphone,
        email,
        maritalStatus,
        childrens,
        documents,
        areaChooseID,
        hasBusiness,
        partner,
        terms,
        regDoc
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
        name, 
        birthDate,
        age,
        genre,
        completeAddress,
        profession,
        cellphone,
        email,
        maritalStatus,
        childrens,
        documents,
        areaChooseID,
        hasBusiness,
        partner,
        terms,
        regDoc
     } = req.body;

    if(
        name != undefined ||
        birthDate != undefined ||
        age != undefined ||
        genre != undefined ||
        completeAddress != undefined ||
        profession != undefined ||
        cellphone != undefined ||
        email != undefined ||
        maritalStatus != undefined ||
        childrens != undefined ||
        documents != undefined ||
        areaChooseID != undefined ||
        hasBusiness != undefined ||
        partner != undefined ||
        terms != undefined ||
        regDoc != undefined
        ){

        await serviceContent.Updates(
            req.params.id,
            name, 
            birthDate,
            age,
            genre,
            completeAddress,
            profession,
            cellphone,
            email,
            maritalStatus,
            childrens,
            documents,
            areaChooseID,
            hasBusiness,
            partner,
            terms,
            regDoc
        )

        res.status(200).json({
            name, 
            birthDate,
            age,
            genre,
            completeAddress,
            profession,
            cellphone,
            email,
            maritalStatus,
            childrens,
            documents,
            areaChooseID,
            hasBusiness,
            partner,
            terms,
            regDoc
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

exports.GetThisByPassUser = async (req, res, next) => {

    if(req.params.username){

        const gets = await serviceContent.GetThisByPassUser(
            req.params.username
        )

        res.status(200).json({
            gets
        })

        return;
    }

    res.status(400).json({
        error: `wrong item parameters or doens't exists`
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