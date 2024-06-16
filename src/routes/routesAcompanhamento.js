import express from "express"
import acompanhamentoController from "../controllers/acompanhamentoController.js"
import upload from "../config/multer.js"

const routesAcompanhamento = express.Router()

routesAcompanhamento.get("/acompanhamento", acompanhamentoController.buscaAcompanhamentos)
routesAcompanhamento.get("/acompanhamento/:id", acompanhamentoController.buscaAcompanhamento)
routesAcompanhamento.get("/acompanhamento/image/:filename", acompanhamentoController.buscaImagem)


export default routesAcompanhamento;