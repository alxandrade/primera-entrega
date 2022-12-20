let {Router} = require('express');
let router = Router ();
const Container = require('../contenedor.js')
const producto = new Container();

// Variable para manejar el acceso
const admin = false;

module.exports = app => {
    app.use("/api/carrito", router);

    router.get("/", (req, res) => {
        if(admin){
            const carrito = null;
            const mensaje = null;
            let accion = "carrito";
            res.render("index.ejs", { carrito, accion, mensaje });
        }else{      
            const carrito = null;
            let accion = "carrito";
            const mensaje = "No tiene permisos para acceder a esta sección";
            res.render("index.ejs", { carrito, accion, mensaje });
        }    
    });
}