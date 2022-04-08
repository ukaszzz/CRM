const express = require('express');

const clientRouter = express.Router();

clientRouter
    .get('/', (req, res) => {
        res.send('dziala');
    })

module.exports = {
    clientRouter
}