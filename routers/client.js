const express = require('express');
const {db} = require("../utils/db");

const clientRouter = express.Router();

clientRouter
    .get('/', (req, res) => {
        res.render('client/list-all.hbs', {
            clients: db.getAll()
        })
    })
    .get('/:id', (req, res) => {
        res.render('client/one.hbs', {
            client: db.getOne(req.params.id)
        })
    })
    .post('/', async(req, res) => {
        const id = await db.create(req.body);
        console.log(id);
        res.render('client/added.hbs', {
            name: req.body.name,
            id: id
        });
    })
    .put('/:id', (req, res) => {
        const id = req.params.id;
        const update = db.update(req.params.id, req.body);
        res.render('client/modified.hbs', {
            name: req.body.name,
            update,
            id
        })
    })
    .delete('/:id', (req, res) => {
        db.delete(req.params.id);
        res.render('client/delete.hbs')
    })
    .get('/form/add', (req, res) => {
        res.render('client/forms/add.hbs');
    })
    .get('/form/edit/:id', (req, res) => {
        res.render('client/forms/edit.hbs', {
            client: db.getOne(req.params.id)
        });
    })
module.exports = {
    clientRouter
}