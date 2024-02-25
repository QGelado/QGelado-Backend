import express from "express"
import sorvetePersonalizadoController from "../controllers/sorvetePersonalizadoController.js"

const routesSorvetePersonalizado = express.Router()

routesSorvetePersonalizado.get("/sorvete-personalizado", sorvetePersonalizadoController.buscaSorvetesPersonalizados)
routesSorvetePersonalizado.get("/sorvete-personalizado/:id", sorvetePersonalizadoController.buscaSorvetesPersonalizadosPorId)
routesSorvetePersonalizado.post("/sorvete-personalizado")
routesSorvetePersonalizado.put("/sorvete-personalizado/:id")
routesSorvetePersonalizado.delete("/sorvete-personalizado/:id")

export default routesSorvetePersonalizado;
