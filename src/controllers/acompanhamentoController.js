import mongoose from 'mongoose';
import acompanhamentoModel  from '../models/acompanhamento.js';
import fs from "fs";
import { GridFSBucket } from "mongodb";
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, {
        bucketName: 'acompanhamento',
    });
});

class acompanhamentoController{

    static async buscaAcompanhamentos(req, res) {
        try{
            const resAcompanhamentos = await acompanhamentoModel.find();
            if(resAcompanhamentos.length === 0){
                res.status(404).send({message: "Acompanhamento não disponivel"})
            }else{
                const acompanhamentos = resAcompanhamentos.map((resAcompanhamento) => { return {
                    _id: resAcompanhamento._id,
                    nome: resAcompanhamento.nome,
                    preco: resAcompanhamento.preco,
                    tipo: resAcompanhamento.tipo,
                    quantidade: resAcompanhamento.quantidade,
                    imagem: `/acompanhamento/image/${resAcompanhamento.imagem}`,
                }})
                res.status(200).json(acompanhamentos)
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
                    const acompanhamento = {
                        _id: resAcompanhamento._id,
                        nome: resAcompanhamento.nome,
                        tipo: resAcompanhamento.tipo,
                        preco: resAcompanhamento.preco,
                        quantidade: resAcompanhamento.quantidade,
                        imagem: `/acompanhamento/image/${resAcompanhamento.imagem}`,
                    }
                    res.status(200).json(acompanhamento)
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o acompanhamento" });
        }
    }

    
    static async cadastraAcompanhamento(req, res) {
        try {
            
            const { nome, tipo, quantidade, preco, imagem  } = req.body
            const file = req.file
            
            if( !nome || !tipo || !quantidade || !preco || !file){
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

            const { nome, tipo, quantidade, preco, imagem } = req.body
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
                            const oldFile = await gfs.find({filename: acompanhamentoExistente.imagem}).toArray();
                            
                            if(oldFile && oldFile.length !== 0){
                                gfs.delete(oldFile[0]._id);
                            }
                            acompanhamentoExistente.imagem = file.filename;
                        }

                        await acompanhamentoExistente.updateOne({
                            nome, tipo, quantidade, preco,
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

                    const oldFile = await gfs.find({filename: resAcompanhamento.imagem}).toArray();
                            
                    if(oldFile && oldFile.length !== 0){
                        gfs.delete(oldFile[0]._id);
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

export default acompanhamentoController;