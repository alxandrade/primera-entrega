let productoRoutes = require("../routes/producto");
let carritoRoutes = require("../routes/carrito");

module.exports = app => {    
    carritoRoutes(app);
    productoRoutes(app);
    
    //Raiz del proyecto
    app.get("/",(req, res, next) =>{        
        res.redirect('/api/productos');
    });
}