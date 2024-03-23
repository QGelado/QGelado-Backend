import express from "express";
import routerAdmin from "./routesAdmin.js";
import routesAdminAuth from "./routesAdminAuth.js";
import routesSorvetePersonalizado from "./routesSorvetePersonalizado.js";
import routesSorvetePersonalizadoAuth from "./routesSorvetePersonalizadoAuth.js";
import routesSorvetePadrao from "./routesSorvetePadrao.js";
import routesSorvetePadraoAuth from "./routesSorvetePadraoAuth.js";
import routerUsuario from "./routesUsuario.js";
import routerUsuarioAuth from "./routesUsuarioAuth.js";
import routesPedidosAuth from "./routesPedidosAuth.js";
import routesAcompanhamento from "./routesAcompanhamento.js";
import routesSaborSorvete from "./routesSaborSorvete.js";
import routesRecipiente from "./routesRecipiente.js";

const routes = app => {
    // Tudo que vem depois da routerUsuarioAuth precisa de token
    app.use(express.json(), 
    routerUsuario, routesSorvetePersonalizado, routesSorvetePadrao, routerAdmin, routesAcompanhamento, routesSaborSorvete, routesRecipiente,
    routerUsuarioAuth, routesSorvetePersonalizadoAuth, routesSorvetePadraoAuth,routesAdminAuth, routesPedidosAuth);
}

export default routes;