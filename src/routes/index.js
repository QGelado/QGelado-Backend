import express from "express";
import routesSorvetePadrao from "./routesSorvetePadrao.js";

const routes = app => {
    app.use(express.json(), routesSorvetePadrao);
}

export default routes;