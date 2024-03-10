import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const routerUsuario = express.Router();

routerUsuario.post("/usuario/login", UsuarioController.login);
routerUsuario.post("/usuario", UsuarioController.criaUmNovoUsuario);

export default routerUsuario;
