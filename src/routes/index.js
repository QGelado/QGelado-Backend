import express from "express";
import routesSorvetePersonalizado from "./routesSorvetePersonalizado.js";
import routesSorvetePersonalizadoAuth from "./routesSorvetePersonalizadoAuth.js";
import routesSorvetePadrao from "./routesSorvetePadrao.js";
import routesSorvetePadraoAuth from "./routesSorvetePadraoAuth.js";
import routerUsuario from "./routesUsuario.js";
import routerUsuarioAuth from "./routesUsuarioAuth.js";
import routesPedidosAuth from "./routesPedidosAuth.js";

const routes = app => {
    // Tudo que vem depois da routerUsuarioAuth precisa de token
    app.use(express.json(), 
    routerUsuario, routesSorvetePersonalizado, routesSorvetePadrao, 
    routerUsuarioAuth, routesSorvetePersonalizadoAuth, routesSorvetePadraoAuth, routesPedidosAuth);
}

export default routes;