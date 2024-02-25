import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const routerUsuario = express.Router();

routerUsuario.get("/usuario", UsuarioController.buscaTodosOsUsuario);
routerUsuario.get("/usuario/:id", UsuarioController.buscaUmUsuarioPorId);
routerUsuario.post("/usuario", UsuarioController.criaUmNovoUsuario);
routerUsuario.put("/usuario/:id", UsuarioController.atualizarUsuario);
routerUsuario.delete("/usuario/:id", UsuarioController.deletaUsuario);

export default routerUsuario;
