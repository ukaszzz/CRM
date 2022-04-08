const express = require('express');
const hbs  = require('express-handlebars');
const {clientRouter} = require("./routers/client");
const {homeRouter} = require("./routers/home");
const {db} = require('./utils/db');

const app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/client', clientRouter);
app.use('/', homeRouter);
app.get('/test', (req, res) => {
    db.update( '3c00ddf5-1352-4f0c-a1ee-25f60a9b7952',{
        "name": "hehehehe",
        "mail": "test2@mail.pl"
    })
    res.send('ok')
});

app.listen(3000, 'localhost', ()=> {
    console.log('listen on 3000')
})