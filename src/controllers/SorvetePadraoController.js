import mongoose from "mongoose";
import sorvetePadraoModel from "../models/sorvetePadrao.js";
import fs from "fs"
import { GridFSBucket } from "mongodb";
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, {
        bucketName: 'sorvete-padrao',
    });
});

class SorvetePadraoController {
    static async buscaSorvetes(req, res) {
        try {

            const  resSorvetes = await sorvetePadraoModel.find();

            if(resSorvetes.length === 0){
                res.status(404).send({message: "Não possui sorvetes cadastrados"})
            }else{
                const sorvetes = resSorvetes.map(sorvete => {
                    return {
                        _id: sorvete._id,
                        marca: sorvete.marca,
                        quantidade: sorvete.quantidade,
                        status: sorvete.status,
                        nome: sorvete.nome,
                        preco: sorvete.preco,
                        sabor: sorvete.sabor,
                        descricao: sorvete.descricao,
                        imagem: `/sorvete-padrao/image/${sorvete.imagem}`,
                    }
                })
                res.status(200).json(sorvetes)
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
                    const sorvete = {
                        _id: resSorvete._id,
                        marca: resSorvete.marca,
                        quantidade: resSorvete.quantidade,
                        status: resSorvete.status,
                        nome: resSorvete.nome,
                        preco: resSorvete.preco,
                        sabor: resSorvete.sabor,
                        descricao: resSorvete.descricao,
                        imagem: `/sorvete-padrao/image/${resSorvete.imagem}`,
                    }
                    res.status(200).json(sorvete)
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o sorvete" });
        }
    }

    static async cadastraSorvete(req, res) {
        try {
            
            const file = req.file

            if(!file){
                console.log(file);
                res.status(400).send({message: "A imagem é obrigatória para cadastrar um sorvete"})
            }else {

                const dadosSorvete = {...req.body, imagem: file.filename}
                const sorveteCadastrado = await sorvetePadraoModel.create(dadosSorvete);
    
                const sorveteResposta = {
                    _id: sorveteCadastrado._id,
                    marca: sorveteCadastrado.marca,
                    quantidade: sorveteCadastrado.quantidade,
                    status: sorveteCadastrado.status,
                    nome: sorveteCadastrado.nome,
                    preco: sorveteCadastrado.preco,
                    sabor: sorveteCadastrado.sabor,
                    descricao: sorveteCadastrado.descricao,
                    imagem: `/sorvete-padrao/image/${sorveteCadastrado.imagem}`,
                }
    
                res.status(201).json({message: "Sorvete padrão foi cadastrado com sucesso!", data: sorveteResposta})

            }
            

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o sorvete" , error: error.message});
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
                            const oldFile = await gfs.find({filename: sorveteExistente.imagem}).toArray();

                            if(oldFile && oldFile.length !== 0) {
                                gfs.delete(oldFile[0]._id)
                            }

                            sorveteExistente.imagem = file.filename;
                        }

                        await sorveteExistente.updateOne({
                            nome, marca, preco, sabor, quantidade, status, descricao,
                            imagem: sorveteExistente.imagem
                        });
                        const sorveteResposta = {
                            _id: sorveteExistente._id,
                            marca: sorveteExistente.marca,
                            quantidade: sorveteExistente.quantidade,
                            status: sorveteExistente.status,
                            nome: sorveteExistente.nome,
                            preco: sorveteExistente.preco,
                            sabor: sorveteExistente.sabor,
                            descricao: sorveteExistente.descricao,
                            imagem: `/sorvete-padrao/image/${sorveteExistente.imagem}`,
                        }

                        res.status(200).json({message: "Sorvete padrão foi atualizado com sucesso!", data: sorveteResposta});

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

                    const oldFile = await gfs.find({filename: resSorvete.imagem}).toArray();

                    if(oldFile && oldFile.length !== 0) {
                        gfs.delete(oldFile[0]._id)
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

    static async buscaImagem(req, res){
        try{
            const filename = req.params.filename;
            const file = await gfs.find({filename}).toArray();

            if(!file || file.length === 0) {
                return res.status(404).json({message: 'Arquivo não encontrado'})
            }

            const readStream = gfs.openDownloadStreamByName(filename)
            readStream.pipe(res)
        } catch(error){
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o arquivo" });   
        }
    }
}

export default SorvetePadraoController