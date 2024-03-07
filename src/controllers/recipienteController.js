import mongoose from 'mongoose';
import recipienteModel  from '../models/recipiente.js';
import fs from "fs";

class recipienteController{

    static async buscaRecipiente(req, res) {
        try{
            const recipientes = await recipienteModel.find();
            if(recipientes.length === 0){
                res.status(404).send({message: "Recipiente não disponivel"})
            }else{
                res.status(200).json(recipientes)
            }
        }catch(erro){
            console.error(erro)
            res.status(500).json({message:"Ocorreu um erro ao buscar o recipiente"})
        }

    }

    static async buscaRecipiente(req, res) {
        try {

            const id = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                const resRecipiente = await recipienteModel.findById(id);
    
                if(!resRecipiente){
                    res.status(404).send({message: "Recipiente não encontrado"})
                }else{
                    res.status(200).json(resRecipiente)
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o recipiente" });
        }
    }

    
    static async cadastraRecipiente(req, res) {
        try {
            
            const { nome, tipo, quantidade, imagem  } = req.body
            const file = req.file
            
            if( !nome || !tipo || !quantidade || !file){
                res.status(400).send({message: "Preencha todos os dados!"})
            } else {
                
                const dadosRecipiente = {...req.body, imagem: file.path}
                const recipienteCadastrado = await recipienteModel.create(dadosRecipiente);

                res.status(201).json({message: "O recipiente foi cadastrado com sucesso!", data: recipienteCadastrado})

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o recipiente" });
        }
    }
    

    static async atualizaRecipiente(req, res) {
        try {

            const { nome, tipo, quantidade, imagem } = req.body
            const file = req.file
            const id = req.params.id

            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                if( !nome && !tipo && !quantidade && !file  ){
                    res.status(400).send({message: "Preencha um campo para a atualização!"})
                } else {
                    
                    const recipienteExistente = await recipienteModel.findById(id);

                    if(!recipienteExistente){
                        res.status(404).send({message: "Recipiente não encontrado"})
                    } else {

                        if(file){
                            if(fs.existsSync(recipienteExistente.imagem)){
                                fs.unlinkSync(recipienteExistente.imagem);
                            }
                            recipienteExistente.imagem = file.path;
                        }

                        await recipienteExistente.updateOne({
                            nome, tipo, quantidade, imagem,
                            imagem: recipienteExistente.imagem
                        });
                        res.status(201).json({message: "O recipiente foi atualizado com sucesso!", data: recipienteExistente});

                    }
    
                }
                
            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao atualizar o sabor" });
        }
    }

    static async deletaRecipiente(req, res) {
        try {

            const id = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                const resRecipiente = await recipienteModel.findById(id);
    
                if(!resRecipiente){
                    res.status(404).send({message: "Recipiente não encontrado"})
                }else{

                    if(fs.existsSync(resRecipiente.imagem)){
                        fs.unlinkSync(resRecipiente.imagem)
                    }

                    await recipienteModel.findByIdAndDelete(id)
                    res.status(200).json({message: "Recipiente deletado com sucesso!"})
                    
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao deletar o recipiente" });
        }
    }


}

export default recipienteController;