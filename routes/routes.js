const express = require('express');
const router = express.Router();
const upload  = require('../middleware/multer');
const products = require('../product');
const multer = require('multer');

const contenedor = require('../product');


router.get('/', (req,res)=>{
    res.sendFile('index.hmtl')
})

/**** RENDERIZACION VISTAS ****/

router.get('/hbs',(req,res)=>{
    res.render('main.hbs',{layout: false})
});

router.get('/pug',(req,res)=>{
    res.render('main.pug');
});

router.get('/ejs',(req,res)=>{
    res.render('main.ejs');
});

/**** RENDERIZACION VISTAS ****/

router.get('/products', async (req,res)=>{
    res.send( await products.getAll(req,res)) ;
});


router.get('/products/:id', async (req,res)=>{
    res.send(await  products.getById(req,res,req.params.id));
});


router.post('/products', upload.single('image') ,async (req,res)=>{
    res.send(await  products.createProduct(req,res));
});


router.put('/products/:id', async (req,res)=>{
    res.send(await  products.editProduct(req,res,req.params.id));
});


router.delete('/products/:id', async (req,res)=>{
    res.send(await  products.deleteById(req,res));
});


module.exports = router;