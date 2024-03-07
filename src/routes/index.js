import express from "express";
import routesAcompanhamento from "./routesAcompanhamento.js";

const routes = app => {
    app.use(express.json(), routesAcompanhamento);
}

export default routes;