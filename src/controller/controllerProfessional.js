const serviceContent = require('../services/serviceProfessional');

exports.Gets = async (req, res, next) => {

    const gets = await serviceContent.Gets();

    if (gets.length > 0 && gets != undefined) {
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
        cpf,
        cnpj,
        cellphone,
        email,
        address,
        documents
    } = req.body;

    if (![
        name,
        rg,
        cpf,
        cnpj,
        cellphone,
        email,
        address,
        documents
    ].includes(undefined)) {

        await serviceContent.Create(
            name,
            rg,
            cpf,
            cnpj,
            cellphone,
            email,
            address,
            documents
        )

        res.status(200).json({
            name,
            rg,
            cpf,
            cnpj,
            cellphone,
            email,
            address,
            documents
        })

        return;
    }

    if ([
        name,
        rg,
        cpf,
        cnpj,
        cellphone,
        email,
        address,
        documents
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
        cpf,
        cnpj,
        cellphone,
        email,
        address,
        documents
    })


}

exports.Updates = async (req, res, next) => {
    let {
        name,
        rg,
        cpf,
        cnpj,
        cellphone,
        email,
        address,
        documents
    } = req.body;

    if (
        name != undefined ||
        rg != undefined ||
        cpf != undefined ||
        cnpj != undefined ||
        cellphone != undefined ||
        email != undefined ||
        address != undefined ||
        documents != undefined 
    ) {

        let professional = await serviceContent.Updates(
            name,
            rg,
            cpf,
            cnpj,
            cellphone,
            email,
            address,
            documents
        )

        res.status(200).json({
            professional
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

exports.DestroyUser = async (req, res, next) => {

    if (req.params.id) {

        const _destroy = await serviceContent.DestroyUser(
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