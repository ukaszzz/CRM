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
    .post('/', (req, res) => {
        res.send('dodaj');
    })
    .put('/:id', (req, res) => {
        res.send('zmodyfikuj');
    })
    .get('/:id', (req, res) => {
        res.send('usuń');
    })


module.exports = {
    clientRouter
}