let {Router} = require('express');
let router = Router ();
const Container = require('../contenedor.js')
const clsCarrito = new Container();
const pathCarrito = './carrito.txt';

// Variable para manejar el acceso; TRUE es Admin; FALSE no acceso
const admin = true;

module.exports = app => {
    app.use("/api/carrito", router);

    // Traer TODOS los Carritos
    router.get("/", (req, res) => {
        if(admin){
            let carrito = clsCarrito.read(pathCarrito);            
            let mensaje = null;
            let accion = "TodosLosCarritos";

            res.render("carrito.ejs", { carrito, accion, mensaje });
            /*console.log("Objetos");
            console.log(carrito[0].productos[0].modelo);
            res.send(carrito);*/
        }else{      
            const carrito = null;
            let accion = "SinAccesoCarrito";
            const mensaje = "No tiene permisos para acceder a esta sección";
            res.render("index.ejs", { carrito, accion, mensaje });
        }    
    });

    // Traer los datos de un carrito de un ID
    router.get ("/:id",(req, res, next) =>{
        try{            
            let id = parseInt(req.params.id);  
            let carrito = clsCarrito.getByIdCarrito(id, pathCarrito);            
            let accion = 'detalleCarrito';              
            const mensaje = "";            
            res.send(carrito);
            //carrito ? res.render('carrito.ejs',{ carrito, accion, mensaje}): res.status(400).json({error:`Producto No Encontrado con ID: ${id}`});
        } catch(error){
            console.log(error);
        }
    });

    // Agregar nuevo producto a un carrito existente
    router.post ("/",(req, res, next) =>{
            
            let {idCarrito, modelo, descripcion, precio, idProd} = req.body
                        
            if(!idCarrito||!modelo||!descripcion||!precio||!idProd){
                console.log("Faltan datos");
            } else {                                    
                let carritosAll = clsCarrito.read(pathCarrito);
                console.log(carritosAll);

                carritosAll.map(c => {
                    if(c.idCarrito === idCarrito){
                        //res.send("Si llegue " + c.productos[0].modelo);
                        res.send("Agregar Producto al Carrito");
                        /*let obj = [{}];
                        c.productos.push(obj);
                        clsCarrito.write(productosAll, pathProducts);
                        /*
                        let productosAll = producto.read(pathProducts);
                        let obj = req.body;
                        
                        productosAll.push(obj);
                        producto.write(productosAll, pathProducts);
                        res.redirect('/api/carrito');
                        */
                    } 
                });                                
            }
      
    });

    // Borrar los datos de un carrito por su ID
    router.delete ("/:id",(req, res, next) =>{
        try{
            console.log("DELETE");
            let id = parseInt(req.params.id);
            console.log(id);
            clsCarrito.deleteByIdCarrito(id, pathCarrito);
            let productosAll = clsCarrito.read(pathCarrito);            
            let accion = 'borrarCarritoId';
            console.log(productosAll);
            //res.render('index.ejs', {productosAll, accion})

        } catch{
            console.log(error);
        }
    });
}