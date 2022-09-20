const serviceContent = require('../services/serviceNotification');
const EventEmmiter = require('events');
const Stream = new EventEmmiter();


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

    let data = JSON.stringify(req.body)

    await serviceContent.Create(data);

    if (![
        req.body
    ].includes(undefined)) {

        res.status(200).json({
            response: req.body
        })

        return;
    }

    if ([
        req.body
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
        response: req.body
    })

    // res.writeHead(200, {
    //     'Content-Type': 'text/event-stream',
    //     'Cache-Control': 'no-cache',
    //     Connection: 'keep-alive'
    // });

    // Stream.on('push', (event, data) => {
    //     res.write('event: ' + String(event) + '\n' + 'data: ' + data + '\n\n');
    // });

    // Stream.emit('hook', 'message', { msg: data });

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
        documents
    } = req.body;

    if (
        name != undefined ||
        rg != undefined ||
        cep != undefined ||
        cpf != undefined ||
        cnpj != undefined ||
        cellphone != undefined ||
        email != undefined ||
        address != undefined ||
        documents != undefined 
    ) {

        await serviceContent.Updates(
            name,
            rg,
            cep,
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
            cep,
            cpf,
            cnpj,
            cellphone,
            email,
            address,
            documents
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