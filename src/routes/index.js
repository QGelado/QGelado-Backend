import express from "express";
import routerUsuario from "./routesUsuario.js";

const routes = app => {
    app.use(express.json(), routerUsuario);
}

export default routes;