import express from "express"
import recipienteController from "../controllers/recipienteController.js"
import upload from "../config/multer.js"

const routesRecipiente = express.Router()

routesRecipiente.get("/recipiente", recipienteController.buscaRecipiente)
routesRecipiente.get("/recipiente/:id", recipienteController.buscaRecipiente)
routesRecipiente.post("/recipiente", upload('recipiente').single('file'), recipienteController.cadastraRecipiente)
routesRecipiente.put("/recipiente/:id", upload('recipiente').single('file'), recipienteController.atualizaRecipiente)
routesRecipiente.delete("/recipiente/:id", recipienteController.deletaRecipiente)

export default routesRecipiente;