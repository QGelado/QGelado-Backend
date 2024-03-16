import express from "express";
import AdminController from "../controllers/AdminController.js";

const routerAdmin = express.Router()

routerAdmin.get("/admin", AdminController.buscaTodosOsAdmin);
routerAdmin.get("/admin/:id", AdminController.buscaUmAdmin);
routerAdmin.put("/admin/:id", AdminController.atualizaUmAdmin);
routerAdmin.delete("/admin/:id", AdminController.deletaUmAdmin);

export default routerAdmin;