import express from "express";
import routesSorvetePersonalizado from "./routesSorvetePersonalizado.js";
import routesSorvetePersonalizadoAuth from "./routesSorvetePersonalizadoAuth.js";
import routesSorvetePadrao from "./routesSorvetePadrao.js";
import routesSorvetePadraoAuth from "./routesSorvetePadraoAuth.js";
import routerUsuarioAuth from "./routesUsuarioAuth.js";
import routerUsuario from "./routesUsuario.js";

const routes = app => {
    // Tudo que vem depois da routerUsuarioAuth precisa de token
    app.use(express.json(), 
    routerUsuario, routesSorvetePersonalizado, routesSorvetePadrao, 
    routerUsuarioAuth, routesSorvetePersonalizadoAuth, routesSorvetePadraoAuth);
}

export default routes;