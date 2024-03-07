import express from "express"
import acompanhamentoController from "../controllers/acompanhamentoController.js"
import upload from "../config/multer.js"

const routesAcompanhamento = express.Router()

routesAcompanhamento.get("/acompanhamento", acompanhamentoController.buscaAcompanhamento)
routesAcompanhamento.get("/acompanhamento/:id", acompanhamentoController.buscaAcompanhamento)
routesAcompanhamento.post("/acompanhamento", upload('acompanhamento').single('file'), acompanhamentoController.cadastraAcompanhamento)
routesAcompanhamento.put("/acompanhamento/:id", upload('acompanhamento').single('file'), acompanhamentoController.atualizaAcompanhamento)
/*
routesRecipiente.delete("/recipiente/:id", recipienteController.deletaRecipiente)
*/

export default routesAcompanhamento;