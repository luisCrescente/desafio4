const fs = require('fs'); 
const path = require('path');

const lastId = (allProducts) => {
    let ultimo = 0;
    allProducts.forEach(product => {
        if (ultimo < product.id) {
            ultimo = product.id;
        };
    });
    return ultimo;
};

class newProducts {
    constructor(file){
        this.file = file;
    };

    getAll = async (req,res) =>{
        try{
            const products = await fs.promises.readFile(`./${this.file}.json`, 'utf-8');
            const allProducts = JSON.parse(products);
            if(allProducts.length > 0){
            res.status(200).json({
                data:allProducts,
                status:200
            }); 
        }else res.status(400).json({
            msg: 'no hay productos',
            status:400
        })
        } catch (err){ console.log(err) }
    };


    createProduct = async (req,res)=>{
        
        try{
        const products = await fs.promises.readFile(`./${this.file}.json`, 'utf-8');
        const allProducts = JSON.parse(products);
        
        const newProduct = {
            id: lastId(allProducts)+1,
            name: req.body.title,
            price: req.body.price,
            image: req.file.filename
        }
            
        allProducts.push(newProduct)
            await fs.promises.writeFile('./dataBase.json', JSON.stringify(allProducts, null, '\t'))
            res.status(200).json({
                data:'producto creado',
                status:200
            });
        
        } catch (err){ console.log(err) }
    };


    getById = async (req,res,id)=>{
        try{
            
            const products = await fs.promises.readFile(`./${this.file}.json`, 'utf-8');
            const allProducts = JSON.parse(products);
    
            const product = allProducts.find(product => product.id == id);
    
            if(product != undefined ){
                res.status(200).json({
                    msg:product,
                    status:200
                })
            }else res.status(400).json({
                msg:' producto no encontrado',
                status:400
            });
            
        } catch (err){ console.log(err) }
    };


    editProduct = async (req,res,id)=>{
        try{
        
            const products = await fs.promises.readFile(`./${this.file}.json`, 'utf-8');
            const allProducts = JSON.parse(products);
    
            const productToEdit = allProducts.find( product => product.id == id);
    
            if(productToEdit != undefined){
                const productEdit ={
                    ...productToEdit,
                    name: req.body.title,
                    price: req.body.price,
                }
                const edit = allProducts.indexOf(productToEdit);
                allProducts[edit] = productEdit;
                await fs.promises.writeFile('./dataBase.json', JSON.stringify(allProducts, null, '\t'))
                res.status(200).json({
                    msg:`producto editado`,
                    status:200
                })
            }else res.status(400).json({
                msg: 'producto no encontrado',
                status:400
            })
    
        } catch (err){ console.log(err) }
    };

    deleteById = async (req,res) =>{
        try{
            const id = req.params.id;
            const products = await fs.promises.readFile(`./${this.file}.json`, 'utf-8');
            const allProducts = JSON.parse(products);
            
            const productById = allProducts.filter( product => product.id != id)
            if(productById.length != allProducts.length){
                await fs.promises.writeFile(`./${this.file}.json`, JSON.stringify(productById, null,'\t'));
                res.status(200).json({
                    msg:'producto borrado',
                    status:200
                })
            }else res.status(400).json({
                msg:"producto no encontrado",
                status:400
            })
    
        } catch (err){ console.log(err) }
    }

}

const products = new newProducts('dataBase');

module.exports = products;