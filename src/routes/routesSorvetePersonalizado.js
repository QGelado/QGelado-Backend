import express from "express"
import sorvetePersonalizadoController from "../controllers/sorvetePersonalizadoController.js"

const routesSorvetePersonalizado = express.Router()

routesSorvetePersonalizado.get("/sorvete-personalizado", sorvetePersonalizadoController.buscaSorvetesPersonalizados)
routesSorvetePersonalizado.get("/sorvete-personalizado/:id", sorvetePersonalizadoController.buscaSorvetesPersonalizadosPorId)
routesSorvetePersonalizado.get("/sorvete-personalizado/image/:filename", sorvetePersonalizadoController.buscaImagem)

export default routesSorvetePersonalizado;
