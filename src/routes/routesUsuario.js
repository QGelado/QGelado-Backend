import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import validaToken from "../middleware/middlewareTokenJWT.js";

const routerUsuario = express.Router();

// Faz com que todas as rotas necessitem de um token
routerUsuario.use(validaToken);

routerUsuario.get("/usuario", UsuarioController.buscaTodosOsUsuario);
routerUsuario.get("/usuario/:id", UsuarioController.buscaUmUsuarioPorId);
routerUsuario.put("/usuario/:id", UsuarioController.atualizarUsuario);
routerUsuario.delete("/usuario/:id", UsuarioController.deletaUsuario);

export default routerUsuario;
