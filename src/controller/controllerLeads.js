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
        rg,
        cep,
        cnpj,
        cpf,
        cellphone,
        email,
        address,
        cep_store,
        store_address,
        documents,
        galery_store
    } = req.body;

    if (![
        name,
        rg,
        cep,
        cellphone,
        email,
        address,
        cep_store,
        store_address,
        documents,
        galery_store
    ].includes(undefined)) {

        await serviceContent.Create(
            name,
            rg,
            cep,
            cnpj,
            cpf,
            cellphone,
            email,
            address,
            cep_store,
            store_address,
            documents,
            galery_store
        )

        res.status(200).json({
            name,
            rg,
            cep,
            cnpj,
            cpf,
            cellphone,
            email,
            address,
            cep_store,
            store_address,
            documents,
            galery_store
        })

        return;
    }

    if ([
        name,
        rg,
        cep,
        cellphone,
        email,
        address,
        cep_store,
        store_address,
        documents,
        galery_store
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


    res.status(200).json({
        name,
        rg,
        cep,
        cnpj,
        cpf,
        cellphone,
        email,
        address,
        cep_store,
        store_address,
        documents,
        galery_store
    })


}

exports.Updates = async (req, res, next) => {
    let {
        name,
        rg,
        cep,
        cpf,
        cnpj,
        cellphone,
        email,
        address,
        cep_store,
        store_address,
        documents,
        galery_store
    } = req.body;

    let { id } = req.params;

    if (
        name != undefined ||
        rg != undefined ||
        cep != undefined ||
        cpf != undefined ||
        cnpj != undefined ||
        cellphone != undefined ||
        email != undefined ||
        address != undefined ||
        cep_store != undefined ||
        store_address != undefined ||
        documents != undefined ||
        galery_store != undefined
    ) {

        await serviceContent.Updates(
            id,
            name,
            rg,
            cep,
            cpf,
            cnpj,
            cellphone,
            email,
            address,
            cep_store,
            store_address,
            documents,
            galery_store
        )

        res.status(200).json({
            name,
            rg,
            cep,
            cpf,
            cnpj,
            cellphone,
            email,
            address,
            cep_store,
            store_address,
            documents,
            galery_store
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