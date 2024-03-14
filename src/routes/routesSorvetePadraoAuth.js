import express from "express"
import SorvetePadraoController from "../controllers/SorvetePadraoController.js"
import upload from "../config/multer.js"

const routesSorvetePadraoAuth = express.Router();

routesSorvetePadraoAuth.post("/sorvete-padrao", upload('sorvete-padrao').single('file'), SorvetePadraoController.cadastraSorvete)
routesSorvetePadraoAuth.put("/sorvete-padrao/:id", upload('sorvete-padrao').single('file'), SorvetePadraoController.atualizaSorvete)
routesSorvetePadraoAuth.delete("/sorvete-padrao/:id", SorvetePadraoController.deletaSorvete)

export default routesSorvetePadraoAuth;