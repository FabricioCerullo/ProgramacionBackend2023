import { Router } from "express";
import { changeRoleUser,userDocuments, userChangeWDocument } from "../controller/index.controller.js";
import { uploaderDocuments } from "../utils.js";

const userRouter =  Router();

userRouter.put("/premium/:uid", changeRoleUser);
//userRouter.post("/:uid/documents", uploaderDocuments.array("document"), userDocuments);
userRouter.post("/:uid/documents", uploaderDocuments.fields([{name:"identificacion", maxCount:1}, {name:"domicilio", maxCount:1},{name:"estadoDeCuenta", maxCount:1}]), userChangeWDocument);

export default userRouter;