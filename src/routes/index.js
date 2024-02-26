import express from "express";
import routesSaborSorvete from "./routesSaborSorvete.js";

const routes = app => {
    app.use(express.json(), routesSaborSorvete);
}

export default routes;