const serviceContent = require('../services/serviceLead');

exports.Gets = async (req, res, next) => {

    const gets = await serviceContent.Gets();

    if (gets.length > 0) {
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

    if (gets.length > 0) {
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
        cep,
        cnpj,
        address,
        complement_address,
        cellphone,
        email,
        documents,
        galery_store,
        store_address,
    } = req.body;

    if (![
        name,
        cep,
        cnpj,
        address,
        complement_address,
        cellphone,
        email,
        documents,
        galery_store,
        store_address,
    ].includes(undefined)) {

        await serviceContent.Create(
            name,
            cep,
            cnpj,
            address,
            complement_address,
            cellphone,
            email,
            documents,
            galery_store,
            store_address,
        )

        res.status(200).json({
            name,
            cep,
            cnpj,
            address,
            complement_address,
            cellphone,
            email,
            documents,
            galery_store,
            store_address,
        })

        return;
    }

    if ([
        name,
        cep,
        cnpj,
        address,
        complement_address,
        cellphone,
        email,
        documents,
        galery_store,
        store_address,
    ].includes('')) {
        if (Object.keys(req.body).length == 0) {
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
        cep,
        cnpj,
        address,
        complement_address,
        cellphone,
        email,
        documents,
        galery_store,
        store_address,
    } = req.body;

    if (
        name != undefined ||
        cep != undefined ||
        cnpj != undefined ||
        address != undefined ||
        complement_address != undefined ||
        cellphone != undefined ||
        email != undefined ||
        documents != undefined ||
        galery_store != undefined ||
        store_address != undefined
    ) {

        await serviceContent.Updates(
            name,
            cep,
            cnpj,
            address,
            complement_address,
            cellphone,
            email,
            documents,
            galery_store,
            store_address,
        )

        res.status(200).json({
            name,
            cep,
            cnpj,
            address,
            complement_address,
            cellphone,
            email,
            documents,
            galery_store,
            store_address,
        })

        return;
    }

    res.status(400).json({
        error: `wrong item id or doens't exists`
    })
}

exports.GetThis = async (req, res, next) => {

    if (req.params.id) {

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

    if (req.params.username) {

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

    if (req.params.id) {

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