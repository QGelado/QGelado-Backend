import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const routerUsuario = express.Router();

routerUsuario.post("/usuario/login", UsuarioController.login);

export default routerUsuario;
