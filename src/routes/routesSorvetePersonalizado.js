import express from "express"
import upload from "../config/multer.js"
import sorvetePersonalizadoController from "../controllers/sorvetePersonalizadoController.js"

const routesSorvetePersonalizado = express.Router()

routesSorvetePersonalizado.get("/sorvete-personalizado", sorvetePersonalizadoController.buscaSorvetesPersonalizados)
routesSorvetePersonalizado.get("/sorvete-personalizado/:id", sorvetePersonalizadoController.buscaSorvetesPersonalizadosPorId)
routesSorvetePersonalizado.post("/sorvete-personalizado", upload('sorvete-personalizado').single('file'), sorvetePersonalizadoController.cadastraSorvete)
routesSorvetePersonalizado.put("/sorvete-personalizado/:id", upload('sorvete-personalizado').single('file'), sorvetePersonalizadoController.atualizaSorvete)
routesSorvetePersonalizado.delete("/sorvete-personalizado/:id", sorvetePersonalizadoController.deletaSorvete)

export default routesSorvetePersonalizado;
