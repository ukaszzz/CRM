const express = require('express');
const {db} = require("../utils/db");
const clientRouter = express.Router();
const {ClientRecord} = require('../records/client-record')
const {NotFoundError} = require("../utils/errors");

clientRouter
    .get('/', async(req, res) => {
        res.render('client/list-all.hbs', {
            clients: await db.getAll(),
        });
    })

    .get('/:id', (req, res) => {
        const client = db.getOne(req.params.id);

        if (!client) {
            throw new NotFoundError()
        }
        res.render('client/one.hbs', {
            client,
        })

    })

    .put('/:id', async(req, res) => {
        const id = req.params.id;
        const update = await db.update(req.params.id, req.body);
        res.render('client/modified.hbs', {
            name: req.body.name,
            update,
            id
        })
    })

    .post('/', async(req, res) => {
        const id = await db.create(req.body)
        res
            .status(201)
            .render('client/added.hbs', {
                id,
            })
    })

    .delete('/deleted/:id', async(req, res) => {
        const client = await db.getOne(req.params.id);

        if (!client) {
            throw new NotFoundError()
        } else {
            await db.delete(req.params.id);
        }
        res.render('client/deleted.hbs')
    })

    .get('/form/add', (req, res) => {
        res.render('client/forms/add.hbs');
    })

    .get('/form/edit/:id', async (req, res) => {
        const client = await db.getOne(req.params.id);

        if (!client) {
            throw new NotFoundError()
        }
        res.render('client/forms/edit.hbs', {
            client,
        });
    })


module.exports = {
    clientRouter,
}