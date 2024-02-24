import express from "express"
import SorvetePadraoController from "../controllers/SorvetePadraoController.js"

const routesSorvetePadrao = express.Router();

routesSorvetePadrao.get("/sorvete-padrao", SorvetePadraoController.buscaSorvetes)
routesSorvetePadrao.get("/sorvete-padrao/:id", SorvetePadraoController.buscaSorvete)
routesSorvetePadrao.post("/sorvete-padrao", SorvetePadraoController.cadastraSorvete)
routesSorvetePadrao.put("/sorvete-padrao/:id", SorvetePadraoController.atualizaSorvete)
routesSorvetePadrao.delete("/sorvete-padrao/:id", SorvetePadraoController.deletaSorvete)

export default routesSorvetePadrao;