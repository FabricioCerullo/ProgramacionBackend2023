import { Router} from "express";
import passport from "passport";

import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken"
import { options } from "../config/options.js";

const router = Router();

//rutas de autenticacion

//registro con passport

router.post("/registro", passport.authenticate("registroStrategy", {
    failureRedirect: "/api/sessions/failed",
}), async (req, res) => {
    res.redirect("/login");
}
)


router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/failed",
}), async (req, res) => {
    res.redirect("/perfil");
})

router.get("/github", passport.authenticate("github", {scope: ["user:email"] }),
async (req,res)=>{
    //
}
);

router.get("/github-callback", passport.authenticate("github",{failureRedirect:"/api/sessions/failed"}),
async (req,res)=>{
    req.session.user = req.user;
    //console.log(req.session.user = req.user);
    res.redirect("/");
}
)

router.get("/current", passport.authenticate("authSessions",{failureRedirect:"/api/sessions/failed"}),
async (req, res) => {
    if (req.session.user) {
        res.status(200).json({user:req.session.user});
    }else{
        res.status(401).json({error:"No se ha iniciado sesion crack!"});
    }
    }
)

//route para fallas 
router.get("/failed", async(req, res) => {
    console.log("falla!... algo salio mal");
    res.status(500).send("error");
})


router.post("/forgot", async(req, res) => {
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

})


router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Internal server error");
          }
          res.redirect("/login");
    })
})

//registro y login ---- 
 /*

router.post('/registro', async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body;
        const newUser = {
            first_name,
            last_name,
            email, 
            age,
            password:createHash(password)
        };
        const userCreated = await userModel.create(newUser);
        res.send( `Hola!, Bienvenido: ${userCreated.first_name}`)
        }catch (error) {
        res.status(401).send("error");
    }
});


router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email:email});

        if (user) {

            if (isValidPassword(user, password)) {
                req.session.user = user.email;
                const domain = email.split('@')[1];
                if (domain==="admin.com") {
                    res.status(200).send("el usuario es valido, es admin.");
                    res.redirect("/perfil");
                }else {
                    res.send("Login Exitoso!")
            }
        }else{
           res.status(401).send("no existe el correo");
        }
    }
    } catch (error) {
        res.status(401).send("error");
    }
})
*/

export {router as AutenRouter};