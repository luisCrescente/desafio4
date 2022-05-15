const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const upload  = require('../middleware/multer');


router.get('/products', async (req,res)=>{
    try{
        const products = await fs.promises.readFile('./dataBase.json', 'utf-8');
        const allProducts = JSON.parse(products);
        res.status(200).json({
            data:allProducts,
            status:200
        }); 
    } catch (err){ console.log(err)}
});


router.get('/products/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const products = await fs.promises.readFile('./dataBase.json', 'utf-8');
        const allProducts = JSON.parse(products);

        const findProduct = allProducts.find(product => product.id == id);

        if(findProduct != undefined ){
            res.status(200).json({
                msg:findProduct,
                status:200
            })
        }else res.status(400).json({
            msg:' producto no encontrado',
            status:400
        });
        
    } catch (err){ console.log(err)}
});


router.post('/products', upload.single() ,async (req,res)=>{

        const products = await fs.promises.readFile('./dataBase.json', 'utf-8');
        const allProducts = JSON.parse(products);
        const newProduct = {
            id: lastId(allProducts)+1,
            title: req.body.title,
            price: req.body.price,
            image: req.file.filename
        };
    try{
        allProducts.push(newProduct)
        await fs.promises.writeFile('./dataBase.json', JSON.stringify(allProducts, null, '\t'))
        res.status(200).json({
            data:'producto creado',
            status:200
        })
    } catch (err){ console.log(err)}
});


router.put('/products/:id', async (req,res)=>{
    try{

    } catch (err){ console.log(err)}
});


router.delete('/products/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const products = await fs.promises.readFile('./dataBase.json', 'utf-8');
        const allProducts = JSON.parse(products);
        
        const productById = allProducts.filter( product => product.id != id)
        if(productById.length != allProducts.length){
            await fs.promises.writeFile('./dataBase.json', JSON.stringify(productById, null,'\t'));
            res.status(200).json({
                msg:'producto borrado',
                status:200
            })
        }else res.status(400).json({
            status:400,
            msg:"producto no eliminado"
        })

    } catch (err){ console.log(err)}
});


module.exports = router;