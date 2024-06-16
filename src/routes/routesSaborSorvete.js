import express from "express"
import saborSorveteController from "../controllers/saborSorveteController.js"
import upload from "../config/multer.js"

const routesSaborSorvete = express.Router()

routesSaborSorvete.get("/sabor-sorvete", saborSorveteController.buscaSabores)
routesSaborSorvete.get("/sabor-sorvete/:id", saborSorveteController.buscaSabor)
routesSaborSorvete.get("/sabor-sorvete/image/:filename", saborSorveteController.buscaImagem)

export default routesSaborSorvete;