import fs from 'fs';
    
class ProductManager{
    #acc=0;

    constructor(){
        this.path="./prod.json";
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        //Codigos Iguales o Repetidos
        const prod = await this.getProducts();
        const productSameCode = prod.some((product) =>product.code===code);
            if(productSameCode){
                throw new Error("El codigo ya existe!")
            }

        //Que todos los campos sean obligatorios

        if (title&&description&&price&&thumbnail&&code&&stock) {
            throw new Error("Error!!");
        }

        const newProd = {
            id:this.#acc,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };  

        const productos = await this.getProducts();
        const updateProduct = [...productos, newProd];
        this.#acc++;    

        await fs.promises.writeFile(this.path,JSON.stringify(updateProduct));
        
    }

    async getProducts(){
       try {
        const productos = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(productos);
    } catch (e) {
            return [];
       }

     }

     //Busqueda del prod. por ID

     async getProductById(id){
        let prodId = await this.getProducts();
        let prod = prodId.find((x)=>x.id===id);
        if(prod){
            return prod;
        }else{
            throw new Error("Product not found");
        }
     }

    async updateProduct(id,elementModif){
        let prodId = await this.getProducts();
        let prod = prodId.find((x)=>x.id===id);

         prod = {...prod,... elementModif}
          let newProdModif = prodId.filter(p=>p.id!==id);
          newProdModif = [...newProdModif, prod];
          await fs.promises.writeFile(this.path, JSON.stringify(newProdModif));
          console.log("Moficado correctamente");

     }

    async deleteProduct(id){
        const prodId = await this.getProducts();

        let delet = prodId.filter((x)=>x.id!==id);
        fs.promises.writeFile(this.path,JSON.stringify(delet))
        console.log("producto eliminado con exito");
     }
}



async function main() {
   /* const manager = new ProductManager();
    await manager.addProduct("Coca Cola 500ml.", "Bebida Gaseosa", 260, "", "7790895000782", 20);
    await manager.addProduct("Coca Cola 1.5lt.", "Bebida Gaseosa", 550, "", "7790895000430", 25);
    await manager.addProduct("Fanta 3lt.", "Bebida Gaseosa", 900, "", "7790895064111", 35);
    await manager.addProduct("Fanta 500 ml.", "Bebida Gaseosa", 260, "", "7790895000836", 10);
    await manager.addProduct("Coquitas 157 gr.", "Golosinas", 300, "", "7790040139411", 25);
    await manager.addProduct("Alfajor Cachafaz", "Golosinas", 300, "", "77934499", 5);
    await manager.addProduct("Chocolate Milka", "Golosinas", 900, "", "7622300875630", 8);
    await manager.addProduct("Hamburguesa Triple con Queso", "Gastronomia", 1500, "", "1105", 9);
    await manager.addProduct("Papas con Cheddar", "Gastronomia", 1000, "", "1104", 12);
    await manager.addProduct("Pizza con Rucula", "Gastronomia", 1800, "", "1103", 2);

    console.log(await manager.getProducts());
   /* await manager.deleteProduct(0);
    console.log(await manager.getProducts());
    await manager.updateProduct(1, {title: "coca de 1.5", price:840});
    console.log(await manager.getProducts());
    await manager.getProductById(1);*/
    
}
main();

export default ProductManager;