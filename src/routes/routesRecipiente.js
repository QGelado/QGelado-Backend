import express from "express"
import recipienteController from "../controllers/recipienteController.js"

const routesRecipiente = express.Router()

routesRecipiente.get("/recipiente", recipienteController.buscaTodosRecipientes)
routesRecipiente.get("/recipiente/:id", recipienteController.buscaRecipiente)
routesRecipiente.get("/recipiente/image/:filename", recipienteController.buscaImagem)

export default routesRecipiente;