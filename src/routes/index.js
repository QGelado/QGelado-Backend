import express from "express";
import routesSorvetePersonalizado from "./routesSorvetePersonalizado.js";
import routesSorvetePersonalizadoAuth from "./routesSorvetePersonalizadoAuth.js";
import routesSorvetePadrao from "./routesSorvetePadrao.js";
import routesSorvetePadraoAuth from "./routesSorvetePadraoAuth.js";

const routes = app => {
    app.use(express.json(), routesSorvetePersonalizado, routesSorvetePadrao, routesSorvetePersonalizadoAuth, routesSorvetePadraoAuth);
}

export default routes;