import FileProductManager from "./managers/desafioJsBackend.js";
import DBProductManager from "./db_managers/desafioJsBackend.js";

const config = {
    persistenceType: "db"
};

let ProductManager;

if (config.persistenceType ==="db") {
    ProductManager = DBProductManager;
}else if (config.persistenceType ==="file"){
    ProductManager = FileProductManager;
}else{
    throw new Error("Error")
}

export {ProductManager};