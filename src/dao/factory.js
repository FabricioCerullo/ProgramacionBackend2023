import {options} from "../config/options.js"
const persistence = options.persistence;

let ManagerDAO, CartsDAO;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/db_Connetions.js");
        connectDB();
        const {ProductManager} = await import("../dao/managers/db_managers/desafioJsBackend.js");
        const {CartManager} = await import("../dao/managers/db_managers/cart.js")
        ManagerDAO = new ProductManager();
        CartsDAO = new CartManager();

        break;

    case "memory":
        const {ManagerProductsMemory} = await import("./managers/db_memory/products.memory.js");
        const {ManagerCartMemory} = await import("./managers/db_memory/cart.memory.js");
        ManagerDAO = new ManagerProductsMemory();
        CartsDAO = new ManagerCartMemory();
        break;
    
}

export {ManagerDAO, CartsDAO}