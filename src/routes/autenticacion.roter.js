import { Router} from "express";
import { userModel } from "../dao/models/user.model.js";


const router = Router();

//rutas de autenticacion

router.post('/registro', async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body;
        const newUser = await userModel.create({first_name, last_name, email, age, password});
        res.send( `Hola!, Bienvenido: ${newUser.first_name}`)
    } catch (error) {
        console.log("errorrrr");
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    function validarEmail(email) {
        const userTrue = userModel.findOne({email});
        if (userTrue) {
            req.session.user = userTrue.email;
            const domain = email.split('@')[1];
                if (domain==="admin.com") {
                    return true;
                }else {return false;} 
        }else{
            return false;
        }
    }

    if (validarEmail(email)){
        console.log("correo valido, es admin");         
        res.redirect("/perfil");
    }
    else{
        console.log("correo invalido, no es admin");
    }
})

router.post("/loguot", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Internal server error");
          }
          res.redirect("/login");
    })
})

export {router as AutenRouter};