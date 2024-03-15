import express from "express";
import routerAdmin from "./routesAdmin.js";

const routes = app => {
    app.use(express.json(),routerAdmin);
}

export default routes;