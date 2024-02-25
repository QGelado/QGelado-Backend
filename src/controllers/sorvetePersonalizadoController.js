import mongoose from "mongoose"
import sorvetePersonalizadoModel from "../models/sorvetePersonalizado.js"

class sorvetePersonalizadoController{

    static async buscaSorvetesPersonalizados(req, res){
        try {

            const sorvetesPersonalizados = await sorvetePersonalizadoModel.find()

            if(sorvetesPersonalizados.length === 0){
                res.status(404).send({message: "Não possui sorvetes cadastrados"})
            }else{
                res.status(200).json(sorvetesPersonalizados)
            }

        } catch(erro) {
            console.error(erro)
            res.status(500).json({message: "Ocorreu um erro ao buscar os sorvetes"})
        }
    }

    static async buscaSorvetesPersonalizadosPorId(req, res){
        try {

            const id = req.params.id

            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {

                const sorvetePersonalizado = await sorvetePersonalizadoModel.findById(id)
    
                if(sorvetePersonalizado.length === 0){
                    res.status(404).send({message: "Sorvete não encontrado"})
                }else{
                    res.status(200).json(sorvetePersonalizado)
                }

            }

        } catch(erro) {
            console.error(erro)
            res.status(500).json({message: "Ocorreu um erro ao buscar os sorvetes"})
        }
    }

}

export default sorvetePersonalizadoController;