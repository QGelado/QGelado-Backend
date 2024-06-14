import mongoose from "mongoose"
import fs from "fs"
import sorvetePersonalizadoModel from "../models/sorvetePersonalizado.js"
import { GridFSBucket } from "mongodb";

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, {
        bucketName: 'sorvete-personalizado',
    });
});


class sorvetePersonalizadoController{

    static async buscaSorvetesPersonalizados(req, res){
        try {

            const sorvetesPersonalizados = await sorvetePersonalizadoModel.find()

            if(sorvetesPersonalizados.length === 0){
                res.status(404).send({message: "Não possui sorvetes cadastrados"})
            }else{
                const sorvetes = sorvetesPersonalizados.map(sorvete => {
                    return {
                        _id: sorvete._id,
                        sabores: sorvete.sabores,
                        acompanhamentos: sorvete.acompanhamentos,
                        nome: sorvete.nome,
                        preco: sorvete.preco,
                        recipiente: sorvete.recipiente,
                        descricao: sorvete.descricao,
                        imagem: `/sorvete-personalizado/image/${sorvete.imagem}`,
                    }
                })
                res.status(200).json(sorvetes)
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
                    const sorvete = {
                        _id: sorvetePersonalizado._id,
                        sabores: sorvetePersonalizado.sabores,
                        acompanhamentos: sorvetePersonalizado.acompanhamentos,
                        nome: sorvetePersonalizado.nome,
                        preco: sorvetePersonalizado.preco,
                        recipiente: sorvetePersonalizado.recipiente,
                        descricao: sorvetePersonalizado.descricao,
                        imagem: `/sorvete-personalizado/image/${sorvetePersonalizado.imagem}`,
                    }
                    res.status(200).json(sorvete)
                }

            }

        } catch(erro) {
            console.error(erro)
            res.status(500).json({message: "Ocorreu um erro ao buscar os sorvetes"})
        }
    }

    static async cadastraSorvete(req, res) {
        try {

            const file = req.file

                const dadosSorvete = {...req.body, imagem: file?.filename}
                const sorveteCadastrado = await sorvetePersonalizadoModel.create(dadosSorvete)

                const sorveteResposta = {
                    _id: sorveteCadastrado._id,
                    sabores: sorveteCadastrado.sabores,
                    acompanhamentos: sorveteCadastrado.acompanhamentos,
                    nome: sorveteCadastrado.nome,
                    preco: sorveteCadastrado.preco,
                    recipiente: sorveteCadastrado.recipiente,
                    descricao: sorveteCadastrado.descricao,
                    imagem: `/sorvete-personalizado/image/${sorveteCadastrado.imagem}`,
                }

                res.status(201).json({message: "Sorvete personalizado foi cadastrado com sucesso!", data: sorveteResposta})


        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o sorvete", error: error.message });
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
                            const oldFile = await gfs.find({filename: sorveteExistente.imagem}).toArray();

                            if(oldFile && oldFile.length !== 0) {
                                gfs.delete(oldFile[0]._id)
                            }
                            sorveteExistente.imagem = file.filename;
                        }

                        await sorveteExistente.updateOne({
                            nome, recipiente, preco, recipiente, sabores, acompanhamentos, descricao,
                            imagem: sorveteExistente.imagem
                        });

                        const sorveteResposta = {
                            _id: sorveteExistente._id,
                            sabores: sorveteExistente.sabores,
                            acompanhamentos: sorveteExistente.acompanhamentos,
                            nome: sorveteExistente.nome,
                            preco: sorveteExistente.preco,
                            recipiente: sorveteExistente.recipiente,
                            descricao: sorveteExistente.descricao,
                            imagem: `/sorvete-personalizado/image/${sorveteExistente.imagem}`,
                        }

                        res.status(201).json({message: "Sorvete personalizado foi atualizado com sucesso!", data: sorveteResposta});

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

                    const oldFile = await gfs.find({filename: resSorvete.imagem}).toArray();

                    if(oldFile && oldFile.length !== 0){
                        gfs.delete(oldFile[0]._id)
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

    static async buscaImagem(req, res){
        try{
            const filename = req.params.filename;
            const file = await gfs.find({filename}).toArray();

            if(!file || file.length === 0) {
                return res.status(404).json({message: 'Arquivo não encontrado'})
            }

            const readStream = gfs.openDownloadStreamByName(filename)
            readStream.pipe(res)
        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o arquivo" })
        }
    }

}

export default sorvetePersonalizadoController;