import mongoose from 'mongoose';
import saborSorveteModel  from '../models/sabor-sorvete.js';
import fs from "fs";

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

    static async cadastraSaborSorvete(req, res) {
        try {
            
            const { nome, sabor, quantidade, imagem  } = req.body
            const file = req.file
            
            if( !nome || !sabor || !quantidade || !file){
                res.status(400).send({message: "Preencha todos os dados!"})
            } else {
                
                const dadosSaborSorvete = {...req.body, imagem: file.path}
                const saborCadastrado = await saborSorveteModel.create(dadosSaborSorvete);

                res.status(201).json({message: "O sabor foi cadastrado com sucesso!", data: saborCadastrado})

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o sabor" });
        }
    }

    static async atualizaSaborSorvete(req, res) {
        try {

            const { nome, sabor, quantidade, imagem } = req.body
            const file = req.file
            const id = req.params.id

            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                if( !nome && !sabor && !quantidade && !file  ){
                    res.status(400).send({message: "Preencha um campo para a atualização!"})
                } else {
                    
                    const saborExistente = await saborSorveteModel.findById(id);

                    if(!saborExistente){
                        res.status(404).send({message: "Sabor não encontrado"})
                    } else {

                        if(file){
                            if(fs.existsSync(saborExistente.imagem)){
                                fs.unlinkSync(saborExistente.imagem);
                            }
                            saborExistente.imagem = file.path;
                        }

                        await saborExistente.updateOne({
                            nome, sabor, quantidade, imagem,
                            imagem: saborExistente.imagem
                        });
                        res.status(201).json({message: "O sabor foi atualizado com sucesso!", data: saborExistente});

                    }
    
                }
                
            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao atualizar o sabor" });
        }
    }

    static async deletaSaborSorvete(req, res) {
        try {

            const id = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                const resSabor = await saborSorveteModel.findById(id);
    
                if(!resSabor){
                    res.status(404).send({message: "Sabor não encontrado"})
                }else{

                    if(fs.existsSync(resSabor.imagem)){
                        fs.unlinkSync(resSabor.imagem)
                    }

                    await saborSorveteModel.findByIdAndDelete(id)
                    res.status(200).json({message: "Sabor deletado com sucesso!"})
                    
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao deletar o sabor" });
        }
    }


}

export default saborSorveteController;