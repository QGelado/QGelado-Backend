import express from "express";
import routesSorvetePadrao from "./routesSorvetePadrao.js";
import routesSorvetePadraoAuth from "./routesSorvetePadraoAuth.js";

const routes = app => {
    app.use(express.json(), routesSorvetePadrao, routesSorvetePadraoAuth);
}

export default routes;