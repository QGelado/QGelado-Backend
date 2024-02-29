import mongoose from "mongoose"
import fs from "fs"
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

    static async cadastraSorvete(req, res) {
        try {

            const { nome, preco, sabores, recipiente, acompanhamentos, imagem, descricao } = req.body
            const file = req.file

            if(!nome || !preco || !sabores || !recipiente || !file || !descricao){
                res.status(400).send({message: "Preencha todos os dados!"})
            } else {

                const dadosSorvete = {...req.body, imagem: file.path}
                const sorveteCadastrado = await sorvetePersonalizadoModel.create(dadosSorvete)
                res.status(201).json({message: "Sorvete personalizado foi cadastrado com sucesso!", data: sorveteCadastrado})

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o sorvete" });
        }
    }

    static async atualizaSorvete(req, res) {
        try {

            const { nome, preco, sabores, recipiente, acompanhamentos, imagem, descricao } = req.body
            const file = req.file
            const id = req.params.id

            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                if( !nome  && !preco && !sabores && !recipiente && !acompanhamentos && !descricao){
                    res.status(400).send({message: "Preencha um campo para a atualização!"})
                } else {
                    
                    const sorveteExistente = await sorvetePersonalizadoModel.findById(id);

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
                            nome, recipiente, preco, recipiente, sabores, acompanhamentos, descricao,
                            imagem: sorveteExistente.imagem
                        });
                        res.status(201).json({message: "Sorvete personalizado foi atualizado com sucesso!", data: sorveteExistente});

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
                
                const resSorvete = await sorvetePersonalizadoModel.findById(id);
    
                if(!resSorvete){
                    res.status(404).send({message: "Sorvete não encontrado"})
                }else{

                    if(fs.existsSync(resSorvete.imagem)){
                        fs.unlinkSync(resSorvete.imagem)
                    }

                    await sorvetePersonalizadoModel.findByIdAndDelete(id)
                    res.status(200).json({message: "Sorvete deletado com sucesso!"})
                    
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao deletar o sorvete" });
        }
    }

}

export default sorvetePersonalizadoController;