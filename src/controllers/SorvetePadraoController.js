import mongoose from "mongoose";
import sorvetePadraoModel from "../models/sorvetePadrao.js";
import fs from "fs"

class SorvetePadraoController {
    static async buscaSorvetes(req, res) {
        try {

            const  resSorvetes = await sorvetePadraoModel.find();

            if(resSorvetes.length === 0){
                res.status(404).send({message: "Não possui sorvetes cadastrados"})
            }else{
                res.status(200).json(resSorvetes)
            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar os sorvetes" });
        }
    }

    static async buscaSorvete(req, res) {
        try {

            const id = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                const resSorvete = await sorvetePadraoModel.findById(id);
    
                if(!resSorvete){
                    res.status(404).send({message: "Sorvete não encontrado"})
                }else{
                    res.status(200).json(resSorvete)
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o sorvete" });
        }
    }

    static async cadastraSorvete(req, res) {
        try {
            
            const { nome, marca, preco, sabor, quantidade, status, descricao  } = req.body
            const file = req.file
            
            if( !nome || !marca || !preco || !sabor || !quantidade || !status || !descricao || !file){
                res.status(400).send({message: "Preencha todos os dados!"})
            } else {
                
                const dadosSorvete = {...req.body, imagem: file.path}
                const sorveteCadastrado = await sorvetePadraoModel.create(dadosSorvete);

                res.status(201).json({message: "Sorvete padrão foi cadastrado com sucesso!", data: sorveteCadastrado})

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o sorvete" });
        }
    }

    static async atualizaSorvete(req, res) {
        try {

            const { nome, marca, preco, sabor, quantidade, status, descricao } = req.body
            const file = req.file
            const id = req.params.id

            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                if( !nome && !marca && !preco && !sabor && !quantidade && !status && !descricao){
                    res.status(400).send({message: "Preencha um campo para a atualização!"})
                } else {
                    
                    const sorveteExistente = await sorvetePadraoModel.findById(id);

                    if(!sorveteExistente){
                        res.status(404).send({message: "Sorvete não encontrado"})
                    } else {

                        if(file){
                            if(fs.existsSync(sorveteExistente.imagem)){
                                fs.unlinkSync(sorveteExistente.imagem);
                            }
                            sorveteExistente.imagem = file.path;
                        }

                        await sorveteExistente.updateOne({
                            nome, marca, preco, sabor, quantidade, status, descricao,
                            imagem: sorveteExistente.imagem
                        });
                        res.status(201).json({message: "Sorvete padrão foi atualizado com sucesso!", data: sorveteExistente});

                    }
    
                }
                
            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao atualizar o sorvete" });
        }
    }

    static async deletaSorvete(req, res) {
        try {

            const id = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                const resSorvete = await sorvetePadraoModel.findById(id);
    
                if(!resSorvete){
                    res.status(404).send({message: "Sorvete não encontrado"})
                }else{

                    if(fs.existsSync(resSorvete.imagem)){
                        fs.unlinkSync(resSorvete.imagem)
                    }

                    await sorvetePadraoModel.findByIdAndDelete(id)
                    res.status(200).json({message: "Sorvete deletado com sucesso!"})
                    
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao deletar o sorvete" });
        }
    }
}

export default SorvetePadraoController