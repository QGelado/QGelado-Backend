import express from "express";
import routesSorvetePersonalizado from "./routesSorvetePersonalizado.js";

const routes = app => {
    app.use(express.json(), routesSorvetePersonalizado);
}

export default routes;