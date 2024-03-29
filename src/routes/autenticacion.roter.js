import { Router} from "express";
import passport from "passport";
import {forgotPassword,registroRedirectController,failedRedirectController,loginRedirectController,gitHubRedirectController,currentRedirectController,forgotRedirectController,logoutRedirectController,authMiddleware,prodDTO } from "../controller/index.controller.js";
import { uploaderProfile } from "../utils.js";

const router = Router();

router.post("/registro", uploaderProfile.single("avatar"),passport.authenticate("registroStrategy", {failureRedirect: "/api/sessions/failed",}),registroRedirectController)
router.post("/login", passport.authenticate("loginStrategy",{failureRedirect: "/api/sessions/failed",}),loginRedirectController)
router.get("/github", passport.authenticate("github", {scope: ["user:email"] }),async (req,res)=>{});
router.get("/github-callback", passport.authenticate("github",{failureRedirect:"/api/sessions/failed"}),gitHubRedirectController)
router.get("/current",authMiddleware,currentRedirectController)
router.get("/failed", failedRedirectController)
router.post("/forgot",forgotRedirectController)
router.get("/logout",logoutRedirectController)
router.post("/resetPassword",forgotPassword )

export {router as AutenRouter};

