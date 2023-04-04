import fs from 'fs';
//import __dirname from '../utils.js'

class ProductManager{
    #acc=0;
    constructor(){
        this.path="../prod.json";
        console.log("Working with products using fileSystem");
    }

    async addProduct(title, description, price, thumbnail, code, stock){
      /*  //Codigos Iguales o Repetidos
        const prod = await this.getProducts();
        const productSameCode = prod.some((prod) =>prod.code===code);
            if(productSameCode){
                throw new Error("El codigo ya existe!")
            }
        //Que todos los campos sean obligatorios

        if (title&&description&&price&&thumbnail&&code&&stock) {
            throw new Error("Error!!");
        }*/

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
        const productos = await fs.promises.readFile(this.path,"utf8");
        return JSON.parse(productos);
    } catch (e) {
            return "error";
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





export default ProductManager;