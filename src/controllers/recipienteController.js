import mongoose from 'mongoose';
import recipienteModel  from '../models/recipiente.js';
import fs from "fs";
import { GridFSBucket } from "mongodb";
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, {
        bucketName: 'recipiente',
    });
});

class recipienteController{

    static async buscaTodosRecipientes(req, res) {
        try{
            const recipientes = await recipienteModel.find();
            if(recipientes.length === 0){
                res.status(404).send({message: "Recipiente não disponivel"})
            }else{
                const resRecipientes = recipientes.map((recipiente) => {
                    return {
                        _id: recipiente._id,
                        nome: recipiente.nome,
                        sabor: recipiente.sabor,
                        quantidade: recipiente.quantidade,
                        preco: recipiente.preco,
                        imagem: `/recipiente/image/${recipiente.imagem}`,
                    }
                })
                res.status(200).json(resRecipientes)
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
                    const recipiente = {
                        _id: resRecipiente._id,
                        nome: resRecipiente.nome,
                        sabor: resRecipiente.sabor,
                        quantidade: resRecipiente.quantidade,
                        preco: resRecipiente.preco,
                        imagem: `/recipiente/image/${resRecipiente.imagem}`,
                    }
                    res.status(200).json(recipiente)
                }

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao buscar o recipiente" });
        }
    }

    
    static async cadastraRecipiente(req, res) {
        try {
            
            const { nome, tipo, quantidade, preco, imagem  } = req.body
            const file = req.file
            
            if( !nome || !tipo || !quantidade || !preco || !file){
                res.status(400).send({message: "Preencha todos os dados!"})
            } else {
                
                const dadosRecipiente = {...req.body, imagem: file.path}
                const recipienteCadastrado = await recipienteModel.create(dadosRecipiente);

                const recipienteResposta = {
                    _id: recipienteCadastrado._id,
                    nome: recipienteCadastrado.nome,
                    sabor: recipienteCadastrado.sabor,
                    quantidade: recipienteCadastrado.quantidade,
                    preco: recipienteCadastrado.preco,
                    imagem: `/recipiente/image/${recipienteCadastrado.imagem}`,
                }

                res.status(201).json({message: "O recipiente foi cadastrado com sucesso!", data: recipienteResposta})

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o recipiente" });
        }
    }
    

    static async atualizaRecipiente(req, res) {
        try {

            const { nome, tipo, quantidade, preco, imagem } = req.body
            const file = req.file
            const id = req.params.id

            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                if( !nome && !tipo && !quantidade && !preco && !file  ){
                    res.status(400).send({message: "Preencha um campo para a atualização!"})
                } else {
                    
                    const recipienteExistente = await recipienteModel.findById(id);

                    if(!recipienteExistente){
                        res.status(404).send({message: "Recipiente não encontrado"})
                    } else {

                        if(file){
                            
                            const oldFile = await gfs.find({filename: recipienteExistente.imagem}).toArray();
                            
                            if(oldFile && oldFile.length !== 0){
                                gfs.delete(oldFile[0]._id);
                            }
                            recipienteExistente.imagem = file.filename;
                        }

                        await recipienteExistente.updateOne({
                            nome, tipo, quantidade, preco,
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
                    
                    const oldFile = await gfs.find({filename: resRecipiente.imagem}).toArray();

                    if(oldFile && oldFile.length !== 0){
                        gfs.delete(oldFile[0]._id)
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

export default recipienteController;