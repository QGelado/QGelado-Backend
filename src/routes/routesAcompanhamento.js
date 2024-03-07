import express from "express"
import acompanhamentoController from "../controllers/acompanhamentoController.js"
import upload from "../config/multer.js"

const routesAcompanhamento = express.Router()

routesAcompanhamento.get("/acompanhamento", acompanhamentoController.buscaAcompanhamento)
routesAcompanhamento.get("/acompanhamento/:id", acompanhamentoController.buscaAcompanhamento)
/*
routesRecipiente.post("/recipiente", upload('recipiente').single('file'), recipienteController.cadastraRecipiente)
routesRecipiente.put("/recipiente/:id", upload('recipiente').single('file'), recipienteController.atualizaRecipiente)
routesRecipiente.delete("/recipiente/:id", recipienteController.deletaRecipiente)
*/

export default routesAcompanhamento;