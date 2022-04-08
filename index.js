const express = require('express');
const hbs  = require('express-handlebars');

const app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('test.hbs')
})

app.listen(3000, 'localhost', ()=> {
    console.log('listen on 3000')
})