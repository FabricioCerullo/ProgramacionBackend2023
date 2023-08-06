import nodemailer from 'nodemailer';
import { options } from './options.js';
//crendenciales de la cuenta de gmail

const adminEmail = options.gmail.adminEmail;
const adminPassword = options.gmail.adminPassword;

//configuracion node js. y gmail

export const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:adminEmail,
        pass:adminPassword
    },
    secure:false,
    tls:{
        rejectUnauthorized:false,
    }
})

//recuperacion de password

export const recoveryPassword=async(email,token) => {
    const link=`http://localhost:8080/forgot?token=${token}`;
    await transporter.sendMail({
        from:options.gmail.adminEmail,
        to:email,
        subject:"restablecer contraseña",
        html:
        `<div>
        <h1>SOLICITUD DE RESTAURACION DE CONTRASEÑA</h1>
        <p>Usted ha solicitado el cambio de contraseña, haga click en el siguiente boton para restablecerla</p>
        <a href="${link}">
        <button>Restablecer Contraseña</button>
        </a>
        </div>
        `
    })
}

export const enviarCorreoEliminado = async (email) => {
    try {
        await transporter.sendMail({
            from:options.gmail.adminEmail,
            to:email,
            subject:"se elimino tu cuenta debido a la inactividad",
            html:
            `<div>
            <h1>Cuenta Eliminada</h1>
            <p>Se ha eliminado su cuenta de la base de datos debido a su inactividad</p>
            </div>
            `
        })
    } catch (error) {
        console.log(error);
    }
}

export const enviarCorreoProductoEliminado = async (email) => {
    try {
        await transporter.sendMail({
            from:options.gmail.adminEmail,
            to:email,
            subject:"se elimino un producto que usted creó",
            html:
            `<div>
            <h1>Producto Eliminada</h1>
            <p>Se ha eliminado un producto que usted creo</p>
            </div>
            `
        })
    } catch (error) {
        console.log(error);
    }
}