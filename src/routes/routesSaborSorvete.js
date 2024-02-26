import express from "express"
import saborSorveteController from "../controllers/saborSorveteController.js"

const routesSaborSorvete = express.Router()

routesSaborSorvete.get("/sabor-sorvete", saborSorveteController.buscaSabor)

export default routesSaborSorvete;