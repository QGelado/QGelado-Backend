import express from "express"
import SorvetePadraoController from "../controllers/SorvetePadraoController.js"

const routesSorvetePadrao = express.Router();

routesSorvetePadrao.get("/sorvete-padrao", SorvetePadraoController.buscaSorvetes)
routesSorvetePadrao.get("/sorvete-padrao/:id", SorvetePadraoController.buscaSorvete)
routesSorvetePadrao.get("/sorvete-padrao/image/:filename", SorvetePadraoController.buscaImagem)

export default routesSorvetePadrao;