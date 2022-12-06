const fs = require('fs');
const pathProducts = './products.txt';

class Contenedor {
    constructor() {}

    save (object) {             
        let nextId = this.getNextId();
        object.id = nextId;                    

        const allProductsArray = this.read();        
        allProductsArray.push(object);      
        this.write(allProductsArray);            
    }

    getNextId() {
        let lastId = 0;
        let allProductsArray = this.read(pathProducts);    
        if (allProductsArray.length > 0) {
            lastId = allProductsArray[allProductsArray.length - 1].id;
        }    
        return lastId + 1;
    }

    read() {        
        let allProductsArray = [];
        try {                        
            let allProductsString = fs.readFileSync(pathProducts, 'utf-8');                                    
            allProductsString.length > 0
                ? (allProductsArray = JSON.parse(allProductsString))
                : (allProductsArray = []);
        } catch (err) {
            console.log("Error en la lectura del archivo", err);
        }
        return allProductsArray;
    }

    write(allProductsArray) {    
        let allProductsString = JSON.stringify(allProductsArray);
        
        try {
            fs.writeFile(pathProducts, allProductsString, function (err) {
                if (err) throw err;
            });
        } catch (error) {
            console.log("Error en la escritura", error.message);
        }
    }

    getById (id) {        
        try {
            if(!id){
                return {status: "error", message: "Id required"}
            } else {
                let buffer = fs.readFileSync(pathProducts, 'utf-8');
                let products = JSON.parse(buffer);
                try{
                    let product = products.find(p => p.id === id);
                    return product
                } catch{
                    return null
                }
            }
        }
        catch (error){ return {'error': error} }
        
    }

    getAll = async () =>{
    try {
        if (fs.existsSync(pathProducts)){
            let data = await fs.promises.readFile(pathProducts,'utf-8');          
            let products = JSON.parse(data);
            return products;
        } else {
            return {status: "error", message: "El archivo no se encuentra disponible para consultar"}
        }
    }
    catch (error){ return {'error': error} }
    }

    deleteById(id){
        try{
            if (fs.existsSync(pathProducts)){
                let data =  fs.readFileSync(pathProducts, 'utf-8');
                let products = JSON.parse(data);
                let newProducts = products.filter(p => p.id != id)
                this.write(newProducts);
            } else {
                 return {status: "error", message: "el archivo no se encuentra disponible"}
            }
        }
        catch (error){ return {'error': error} }
    }

    deleteAll() {
        console.log("Borrar Todo")
        this.products = [];
        this.write(products);
    }


    async createFile() {    
        try {    
            if (fs.existsSync(pathProducts)) {        
                return false;
            } else {        
                await fs.promises.writeFile(pathProducts, "", "utf8");
                return true;
            }
        } catch (err) {
            console.log("Error en la creación del archivo", err);
            return false;
        }
    }
}

module.exports = Contenedor