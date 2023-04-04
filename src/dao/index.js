import FileProductManager from "./managers/desafioJsBackend.js";
import FileCartManager from "./managers/cart.js"
import DBProductManager from "./db_managers/desafioJsBackend.js";
import DBCartManager from "./db_managers/cart.js"

const config = {
    persistenceType: "file",
};

let ProductManager;
let CartManager;

if (config.persistenceType ==="db") {
    ProductManager = DBProductManager;
    CartManager = DBCartManager;
}else if (config.persistenceType ==="file"){
    ProductManager = FileProductManager;
    CartManager = FileCartManager;
}else{
    throw new Error("Error");
}

export { ProductManager, CartManager };