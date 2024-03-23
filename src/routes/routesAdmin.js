import express from "express";
import AdminController from "../controllers/AdminController.js";

const routerAdmin = express.Router()

routerAdmin.post("/admin/login", AdminController.login);
routerAdmin.post("/admin", AdminController.criaUmNovoAdmin);

export default routerAdmin;