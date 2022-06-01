const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');


app.use(express.static('../img') );


app.use(express.urlencoded({ extended: true}));
app.use(express.json());


const messages =[];

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection', (socket) => {
    socket.emit('messages', messages);

    socket.on('new_message', (mensaje) => {
        messages.push(mensaje);
        socketServer.sockets.emit('messages', messages);
    });
    
});

app.use(
    express.static(path.resolve(__dirname, './'))
    );

// vistas HANLEDBARS
app.engine('hbs', handlebars.engine({
    extname:'.hbs',
    defaultLayout:'',
    layoutsDir:__dirname + '/views/handlebars'
}));
app.set('view engine','hbs');
app.set('views', './views/handlebars');


// vista PUG
// app.set('view engine','pug');
// app.set('views', './views/pug');


 // vistas EJS
// app.set('view engine','ejs');
// app.set('views', './views/ejs');

    
const product = require('./routes/routes');
const { Socket } = require('dgram');
app.use('/api',product);



app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});