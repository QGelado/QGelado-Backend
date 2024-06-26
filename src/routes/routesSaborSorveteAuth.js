import express from "express"
import saborSorveteController from "../controllers/saborSorveteController.js"
import upload from "../config/multer.js"

const routesSaborSorvete = express.Router()

routesSaborSorvete.post("/sabor-sorvete", upload('sabor-sorvete').single('file'), saborSorveteController.cadastraSaborSorvete)
routesSaborSorvete.put("/sabor-sorvete/:id", upload('sabor-sorvete').single('file'), saborSorveteController.atualizaSaborSorvete)
routesSaborSorvete.delete("/sabor-sorvete/:id", saborSorveteController.deletaSaborSorvete)

export default routesSaborSorvete;