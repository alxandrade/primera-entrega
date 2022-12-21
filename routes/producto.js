let {Router} = require('express');
let router = Router ();
const Container = require('../contenedor.js')
const producto = new Container();
const pathProducts = './products.txt';

module.exports = app => {
    app.use("/api/productos", router);

    // Traer los datos de todos los producto
    router.get ("/",(req, res, next) =>{
        try{
            let productos = producto.read(pathProducts);
            let accion = 'listaProductos';  
            res.render('index.ejs', {productos, accion})
        } catch(error){
            console.log(error);
        }
    });

    // Traer los datos de todos los producto cuando se dara de alta
    router.get ("/alta",(req, res, next) =>{
        try{
            let productos = producto.read(pathProducts);
            let accion = 'altaProductos';            
            res.render('index.ejs', {productos, accion})
        } catch(error){
            console.log(error);
        }
    });

    // Traer los datos de un producto de un ID
    router.get ("/:id",(req, res, next) =>{
        try{            
            let id = parseInt(req.params.id);  
            let productos = producto.getById(id,pathProducts);            
            let accion = 'detalleProducto';              
            productos ? res.render('index.ejs',{productos, accion}): res.status(400).json({error:`Producto No Encontrado con ID: ${id}`});
        } catch(error){
            console.log(error);
        }
    });

    // Agregar nuevo producto al archivo (BD)
    router.post ("/",(req, res, next) =>{
        try{
            let {modelo, descripcion, precio, thumbnail, stock} = req.body
            if(!modelo||!descripcion||!thumbnail||!precio||!stock){
                console.log("Faltan datos");
            } else {
                let nextId = producto.getNextId(pathProducts);
                    
                let productosAll = producto.read(pathProducts);
                let obj = req.body;
                obj.idProd = nextId;

                productosAll.push(obj);
                producto.write(productosAll, pathProducts);

                res.redirect('/api/productos');
            }
        } catch(error){
            console.log(error);
        }
    });

    // Modificar los datos de un ID (Probar por PostMan)
    router.put ("/:id",(req, res, next) =>{
        try{
            let {modelo, descripcion, precio, thumbnail, stock} = req.body
            if(!modelo||!descripcion||!thumbnail||!precio||!stock){
                console.log("Faltan datos");
            }else{
                let productosAll = producto.read(pathProducts);
                let id = parseInt(req.params.id);
                    
                productosAll.map(p => {
                if(p.idProd === id){
                    p.modelo = modelo;
                    p.descripcion = descripcion;
                    p.precio = precio;
                    p.thumbnail = thumbnail;
                    p.stock = stock;                    
                } 
            });

            producto.write(productosAll, pathProducts);
            res.redirect("/api/productos");
        }
        } catch(error){
            console.log(error);
        }
    });

    // Borrar los datos de un ID (Probar por Postman)
    router.delete ("/:id",(req, res, next) =>{
        try{
            let id = parseInt(req.params.id);
            producto.deleteById(id, pathProducts);
            let productos = producto.read(pathProducts);            
            let accion = 'listaProductos';  
            res.render('index.ejs', {productos, accion})
        } catch{
            console.log(error);
        }
    });
}
