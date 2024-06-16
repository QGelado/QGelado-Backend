import express from "express"
import acompanhamentoController from "../controllers/acompanhamentoController.js"
import upload from "../config/multer.js"

const routesAcompanhamento = express.Router()

routesAcompanhamento.post("/acompanhamento", upload('acompanhamento').single('file'), acompanhamentoController.cadastraAcompanhamento)
routesAcompanhamento.put("/acompanhamento/:id", upload('acompanhamento').single('file'), acompanhamentoController.atualizaAcompanhamento)
routesAcompanhamento.delete("/acompanhamento/:id", acompanhamentoController.deletaAcompanhamento)

export default routesAcompanhamento;