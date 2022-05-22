const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const handlebars = require('express-handlebars');


app.use(express.static('../img') );


app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use(
    express.static(path.resolve(__dirname, './'))
    );

// vistas HANLEDBARS
// app.engine('hbs', handlebars.engine({
//     extname:'.hbs',
//     defaultLayout:'main.hbs',
//     layoutsDir:__dirname + './handlebars'
// }));
// app.set('view engine','hbs');
// app.set('views', './views/handlebars');


// // vista PUG
// app.set('view engine','pug');
// app.set('views', './views/pug');


// vistas EJS
app.set('view engine','ejs');
app.set('views', './views/ejs');

    
const product = require('./routes/routes');
app.use('/api',product);



app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});