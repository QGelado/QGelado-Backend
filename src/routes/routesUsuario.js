import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const routerUsuario = express.Router();

routerUsuario.get("/usuario/:id", UsuarioController.buscaUmUsuarioPorId);

export default routerUsuario;
