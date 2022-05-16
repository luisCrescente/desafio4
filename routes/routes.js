const express = require('express');
const router = express.Router();
const upload  = require('../middleware/multer');
const products = require('../product');

const contenedor = require('../product');

router.get('/products', async (req,res)=>{
    res.send( await products.getAll()) ;
});


router.get('/products/:id', async (req,res)=>{
    res.send(await  products.getByID());
});


router.post('/products', upload.single() ,async (req,res)=>{
    res.send(await  products.createProduct());
});


router.put('/products/:id', async (req,res)=>{
    res.send(await  products.editProduct());
});


router.delete('/products/:id', async (req,res)=>{
    res.send(await  products.deleteById());
});


module.exports = router;