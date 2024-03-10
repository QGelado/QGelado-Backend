import express from "express";
import routerUsuario from "./routesUsuario.js";
import routerUsuarioAuth from "./routesUsuarioAuth.js";

const routes = app => {
    // Toda rota que não pede o token tem que vir antes
    app.use(express.json(), routerUsuarioAuth, routerUsuario);
}

export default routes;