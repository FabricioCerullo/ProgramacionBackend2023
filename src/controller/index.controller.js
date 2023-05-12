//paso 3 - luego conecta con router, ya resumido en una sola funcion
import { userModel } from "../dao/models/user.model.js";
import { addProduct, getProduct, getProdId, deleteProduct, getCart, addCart, deleteCart,deleteProdInCart,addProdInCart,updateCart } from "../service/index.service.js";
import prodModel from "../dao/models/prod.model.js";
import { createHash, isValidPassword } from "../utils.js";
                    //PRODUCTOS

export const getProductsController = async (req,res) => {
    try {
        const products = await getProduct();    
         const {limit} = req.query;
         const {page} = req.query;
         const prodFilter = await prodModel.paginate(
            {},
            {limit: limit, page: page}
         )
         if (limit||page) { 
            return res.send({status:"sucess", payload: prodFilter});
         } else {
            res.send({status:"sucess", payload: products});
         }
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
}

export const getProductIDController = async (req, res) => {
    try {
         const { id } = req.params;
         const product = await getProdId(parseInt(id));
         res.send({status:"sucess", payload: product});
     } catch (error) {
         res.status(404).send({status: "error", error: "Ha ocurrido un error!2"});
     }
 
 }

 export const addProductController = async(req, res) => {
    try {
        const {title, description, price, thumbail, code, stock} = req.body;
        const newProd = await addProduct({title, description,price, thumbail, code, stock});
        res.status(201).send({status: "ok", payload: newProd});
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

}

export const deleteProductController = async (req, res)=> {
    try {
        const {pid} = req.params
        const id = parseInt(pid)
        await deleteProduct(id);
        res.send({status: "succes", payload: "Su Producto ha sido elimando exitosamente!"})
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
}

                        //CARTS

export const getCartController = async (req, res)=>{
    const carro = await getCart();
     res.send({status:"sucess", payload: carro});
 }

export const deleteProdInCartController =  async (req, res)=>{
    const {cid,pid} = req.params;
    const prodDel = await deleteProdInCart(cid, pid);
    res.send({status:"success", payload: prodDel});

}

export const addProdInCartController = async (req, res)=>{
    const {cid, pid} = req.params;
    const result = await addProdInCart(cid, pid);
    res.send({status:"success", payload: result});
}

export const updateCartController =  async (req, res)=>{
    const {cid,pid} = req.params;
    const result = await updateCart(cid,pid);
    res.send({status:"success", payload: result});
}

export const deleteCartController = async (req, res) => {
    const {cid} = req.params;
    const result = await deleteCart(cid);
    res.send({status:"success", payload: result});
}

                //VISTAS

export const homeRenderProductsController = async (req,res)=>{
    const prod = await getProduct();
    res.render("home", {prod})
}

export const realTimeProductsRenderController = async (req,res)=>{
    const prod = await getProduct();
    res.render("real-time-products", {prod})             
}

export const productIDRenderController = async (req,res)=>{
    const {pid} = req.query;
    const prod = await getProdId(pid);
    res.render("home", {prod});
}

                //VISTAS DE USUARIOS

export const loginController = (req, res) => {
    res.render("login");
}               

export const perfilController = (req, res) => {
    res.render("perfil");
}

export const registroController = (req, res) => {
    res.render("registro");
}

export const forgotController = (req, res) => {
    res.render("forgot");
}

                //REDIRECCIONES DE USUARIOS

export const registroRedirectController =  async (req, res) => {
    res.redirect("/login");
}

export const loginRedirectController = async (req, res) => {
    res.redirect("/perfil");
}

export const failedRedirectController = async (req, res) => {
    console.log("falla!... algo salio mal");
    res.status(500).send("error");
}

export const gitHubRedirectController = async (req,res)=>{
    req.session.user = req.user;
    //console.log(req.session.user = req.user);
    res.redirect("/");
}

export const currentRedirectController = (req, res) => {
    res.status(200).json({ user: req.user });
}

export const forgotRedirectController =  async(req, res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email:email});

        if (user) {
            user.password = createHash(password);
            const userUpdate = await userModel.findOneAndUpdate({email:user.email}, user);
            res.status(200).send("Contraseña actualizada!")

        }else{
           res.status(401).send("no existe el correo");
        }
    } catch (error) {
        res.status(401).send("error");
    }

}

export const logoutRedirectController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Internal server error");
          }
          res.redirect("/login");
    })
}

                    //MIDDLEWARE DE AUTENTICACION

export const authMiddleware = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const userId = req.session.passport.user;
        const user =await userModel.findById(userId)
          if (!user) return res.status(401).json({ error: 'No se ha iniciado sesión.' });
          req.user = user;
          next();
}}                    