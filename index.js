const express = require('express');
const hbs  = require('express-handlebars');
const methodOverride = require('method-override');
const {clientRouter} = require("./routers/client");
const {homeRouter} = require("./routers/home");
const {db} = require('./utils/db');

const app = express();

app.use(methodOverride('_method'));
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

app.listen(3000, 'localhost', ()=> {
    console.log('listen on 3000')
})