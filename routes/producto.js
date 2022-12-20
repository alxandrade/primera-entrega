let {Router} = require('express');
let router = Router ();
const Container = require('../contenedor.js')
const producto = new Container();

module.exports = app => {
    app.use("/api/productos", router);

    // Traer los datos de todos los producto
    router.get ("/",(req, res, next) =>{
        try{
            let productos = producto.read();
            let accion = 'listaProductos';  
            res.render('index.ejs', {productos, accion})
        } catch(error){
            console.log(error);
        }
    });

    // Traer los datos de todos los producto cuando se dara de alta
    router.get ("/alta",(req, res, next) =>{
        try{
            let productos = producto.read();
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
            let productoEncontrado = producto.getById(id);
            let accion = 'detalleProducto';              
            productoEncontrado ? res.render('index.ejs',{productoEncontrado, accion}): res.status(400).json({error:`Producto No Encontrado con ID: ${id}`});
        } catch(error){
            console.log(error);
        }
    });

    // Agregar nuevo producto al archivo
    router.post ("/",(req, res, next) =>{
        try{
            let {title,price,thumbnail} = req.body
            if(!title||!price||!thumbnail){
                console.log("Faltan datos");
            } else {
                let nextId = producto.getNextId();
                    
                let productosAll = producto.read();
                let obj = req.body;
                obj.id = nextId;

                productosAll.push(obj);
                producto.write(productosAll);

                res.redirect('/api/productos');
            }
        } catch(error){
            console.log(error);
        }
    });

    // Modificar los datos de un ID
    router.put ("/:id",(req, res, next) =>{
        try{
            let {title,price,thumbnail} = req.body
            if(!title||!price||!thumbnail){
                console.log("Faltan datos");
            }else{
                let productosAll = producto.read();
                let id = parseInt(req.params.id);
                    
                productosAll.map(p => {
                if(p.id === id){
                    p.title = title;
                    p.price = price;
                    p.thumbnail = thumbnail;
                } 
            });

            producto.write(productosAll);
            res.redirect("/api/productos");
        }
        } catch(error){
            console.log(error);
        }
    });

    // Borrar los datos de un ID
    router.delete ("/:id",(req, res, next) =>{
        try{
            let id = parseInt(req.params.id);
            producto.deleteById(id);
            let productosAll = producto.read();            
            let accion = 'listaProductos';  
            res.render('index.ejs', {productosAll, accion})
        } catch{
            console.log(error);
        }
    });
}
