import express from "express";
import routesSorvetePersonalizado from "./routesSorvetePersonalizado.js";
import routesSorvetePersonalizadoAuth from "./routesSorvetePersonalizadoAuth.js";

const routes = app => {
    app.use(express.json(), routesSorvetePersonalizado, routesSorvetePersonalizadoAuth);
}

export default routes;