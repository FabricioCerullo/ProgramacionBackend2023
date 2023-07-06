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