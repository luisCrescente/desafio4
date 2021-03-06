const express = require('express');
const router = express.Router();
const upload  = require('../middleware/multer');
const products = require('../product');
const fs = require('fs')
const multer = require('multer');

const contenedor = require('../product');


router.get('/', (req,res)=>{
    res.sendFile('index.hmtl');
})

/**** RENDERIZACION VISTAS ****/

router.get('/hbs',async (req,res)=>{
    try {
            const reads = await fs.promises.readFile('dataBase.json', 'utf-8');
            const products = JSON.parse(reads);
            res.render('index.hbs',{products:products});
        } catch (err) {console.log(err)}
});

router.get('/pug',async (req,res)=>{
    // try {
    //     const reads = await fs.promises.readFile('dataBase.json', 'utf-8');
    //     const products = JSON.parse(reads);
    //     res.render('main.pug',{products:products});
    // } catch (err) {console.log(err)}
});

router.get('/ejs', async (req,res)=>{
    // const reads = await fs.promises.readFile('dataBase.json', 'utf-8');
    // const products = JSON.parse(reads);
    //res.render('main.ejs',{products:products});
});

/**** RENDERIZACION VISTAS ****/

router.get('/products', async (req,res)=>{
    res.send( await products.getAll(req,res));
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