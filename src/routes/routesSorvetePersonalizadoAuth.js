import express from "express"
import upload from "../config/multer.js"
import sorvetePersonalizadoController from "../controllers/sorvetePersonalizadoController.js"

const routesSorvetePersonalizadoAuth = express.Router()

routesSorvetePersonalizadoAuth.post("/sorvete-personalizado", upload('sorvete-personalizado').single('file'), sorvetePersonalizadoController.cadastraSorvete)
routesSorvetePersonalizadoAuth.put("/sorvete-personalizado/:id", upload('sorvete-personalizado').single('file'), sorvetePersonalizadoController.atualizaSorvete)
routesSorvetePersonalizadoAuth.delete("/sorvete-personalizado/:id", sorvetePersonalizadoController.deletaSorvete)

export default routesSorvetePersonalizadoAuth;
