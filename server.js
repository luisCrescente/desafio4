const express = require('express');
const app = express();
const port = 8080;
const path = require('path');


app.use(express.static('../img') );


app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.use(
    express.static(path.resolve(__dirname, './'))
    );

const product = require('./routes/routes')
app.use('/api',product);



app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});