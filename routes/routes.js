const express = require('express');
const router = express.Router();
const upload  = require('../middleware/multer');
const products = require('../product');
const multer = require('multer');

const contenedor = require('../product');


router.get('/', (req,res)=>{
    res.sendFile('index.hmtl')
})


router.get('/products', async (req,res)=>{
    res.send( await products.getAll(req,res)) ;
});


router.get('/products/:id', async (req,res)=>{
    res.send(await  products.getById(req,res,req.params.id));
});


router.post('/products', upload.single('img') ,async (req,res)=>{
    res.send(await  products.createProduct(req,res));
});


router.put('/products/:id', async (req,res)=>{
    res.send(await  products.editProduct(req,res,req.params.id));
});


router.delete('/products/:id', async (req,res)=>{
    res.send(await  products.deleteById(req,res));
});


module.exports = router;