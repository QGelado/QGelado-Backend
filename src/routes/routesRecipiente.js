import express from "express"
import recipienteController from "../controllers/recipienteController.js"
import upload from "../config/multer.js"

const routesRecipiente = express.Router()

routesRecipiente.get("/recipiente", recipienteController.buscaRecipiente)
routesRecipiente.get("/recipiente/:id", recipienteController.buscaRecipiente)

export default routesRecipiente;