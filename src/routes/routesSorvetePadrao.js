import express from "express"
import SorvetePadraoController from "../controllers/SorvetePadraoController.js"
import upload from "../config/multer.js"

const routesSorvetePadrao = express.Router();

routesSorvetePadrao.get("/sorvete-padrao", SorvetePadraoController.buscaSorvetes)
routesSorvetePadrao.get("/sorvete-padrao/:id", SorvetePadraoController.buscaSorvete)
routesSorvetePadrao.post("/sorvete-padrao", upload('sorvete-padrao').single('file'), SorvetePadraoController.cadastraSorvete)
routesSorvetePadrao.put("/sorvete-padrao/:id", upload('sorvete-padrao').single('file'), SorvetePadraoController.atualizaSorvete)
routesSorvetePadrao.delete("/sorvete-padrao/:id", SorvetePadraoController.deletaSorvete)

export default routesSorvetePadrao;