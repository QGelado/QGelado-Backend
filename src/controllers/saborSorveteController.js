import mongoose from 'mongoose';
import saborSorveteModel  from '../models/sabor-sorvete.js';

class saborSorveteController{

    static async buscaSabor(req, res) {
        try{
            const saborSorvetes = await saborSorveteModel.find();
            if(saborSorvetes.length === 0){
                res.status(404).send({message: "Sabor não disponivel"})
            }else{
                res.status(200).json(saborSorvetes)
            }
        }catch(erro){
            console.error(erro)
            res.status(500).json({message:"Ocorreu um erro ao buscar o sabor"})
        }

    }
}

export default saborSorveteController;