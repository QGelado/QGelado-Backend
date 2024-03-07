import express from "express";
import routesRecipiente from "./routesRecipiente.js";

const routes = app => {
    app.use(express.json(), routesRecipiente);
}

export default routes;