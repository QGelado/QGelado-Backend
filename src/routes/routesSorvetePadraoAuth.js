import express from "express"
import SorvetePadraoController from "../controllers/SorvetePadraoController.js"
import upload from "../config/multer.js"

const routesSorvetePadraoAuth = express.Router();

routesSorvetePadrao.post("/sorvete-padrao", upload('sorvete-padrao').single('file'), SorvetePadraoController.cadastraSorvete)
routesSorvetePadrao.put("/sorvete-padrao/:id", upload('sorvete-padrao').single('file'), SorvetePadraoController.atualizaSorvete)
routesSorvetePadrao.delete("/sorvete-padrao/:id", SorvetePadraoController.deletaSorvete)

export default routesSorvetePadraoAuth;