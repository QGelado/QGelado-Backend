import mongoose from 'mongoose';
import acompanhamentoModel  from '../models/acompanhamento.js';
import fs from "fs";

class acompanhamentoController{

    static async buscaAcompanhamento(req, res) {
        try{
            const resAcompanhamentos = await acompanhamentoModel.find();
            if(resAcompanhamentos.length === 0){
                res.status(404).send({message: "Acompanhamento não disponivel"})
            }else{
                res.status(200).json(resAcompanhamentos)
            }
        }catch(erro){
            console.error(erro)
            res.status(500).json({message:"Ocorreu um erro ao buscar o acompanhamento"})
        }

    }

    
    static async buscaAcompanhamento(req, res) {
        try {

            const id = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                const resAcompanhamento = await acompanhamentoModel.findById(id);
    
                if(!resAcompanhamento){
                    res.status(404).send({message: "Acompanhamento não encontrado"})
                }else{
                    res.status(200).json(resAcompanhamento)
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o acompanhamento" });
        }
    }

    
    static async cadastraAcompanhamento(req, res) {
        try {
            
            const { nome, tipo, quantidade, imagem  } = req.body
            const file = req.file
            
            if( !nome || !tipo || !quantidade || !file){
                res.status(400).send({message: "Preencha todos os dados!"})
            } else {
                
                const dadosAcompanhamento = {...req.body, imagem: file.path}
                const acompanhamentoCadastrado = await acompanhamentoModel.create(dadosAcompanhamento);

                res.status(201).json({message: "O acompanhamento foi cadastrado com sucesso!", data: acompanhamentoCadastrado})

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o acompanhamento" });
        }
    }
    
    
    static async atualizaAcompanhamento(req, res) {
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
                    
                    const acompanhamentoExistente = await acompanhamentoModel.findById(id);

                    if(!acompanhamentoExistente){
                        res.status(404).send({message: "Acompanhamento não encontrado"})
                    } else {

                        if(file){
                            if(fs.existsSync(acompanhamentoExistente.imagem)){
                                fs.unlinkSync(acompanhamentoExistente.imagem);
                            }
                            acompanhamentoExistente.imagem = file.path;
                        }

                        await acompanhamentoExistente.updateOne({
                            nome, tipo, quantidade, imagem,
                            imagem: acompanhamentoExistente.imagem
                        });
                        res.status(201).json({message: "O acompanhamento foi atualizado com sucesso!", data: acompanhamentoExistente});

                    }
    
                }
                
            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao atualizar o acompanhamento" });
        }
    }

    
    static async deletaAcompanhamento(req, res) {
        try {

            const id = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                const resAcompanhamento = await acompanhamentoModel.findById(id);
    
                if(!resAcompanhamento){
                    res.status(404).send({message: "Acompanhamento não encontrado"})
                }else{

                    if(fs.existsSync(resAcompanhamento.imagem)){
                        fs.unlinkSync(resAcompanhamento.imagem)
                    }

                    await acompanhamentoModel.findByIdAndDelete(id)
                    res.status(200).json({message: "Acompanhamento deletado com sucesso!"})
                    
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao deletar o acompanhamento" });
        }
    }

}

export default acompanhamentoController;