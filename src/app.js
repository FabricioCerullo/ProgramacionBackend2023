import express from "express";
import ProductManager from "./desafioJsBackend.js";

const app = express();
let manager = new ProductManager("./prod.json");

app.get("/products", async (req, res) => {
    res.send(manager.getProduct());
});

app.get("/products/:id", async (req, res) => {
    let numeroProduct = parseInt(req.params.id);
    res.send(manager.getProductById(numeroProduct));
});

app.get("/products",async  (req, res) => {
    const producto= await manager.getProducts()
   let { limit } = req.query;
    res.send(producto.filter((x) => x.id <= limit));
});
  
app.listen(8080, () => {
    console.log(`Server listening to port 8080`)
});