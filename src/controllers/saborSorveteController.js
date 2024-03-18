import mongoose from 'mongoose';
import saborSorveteModel  from '../models/sabor-sorvete.js';
import fs from "fs";
import { GridFSBucket } from "mongodb";
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, {
        bucketName: 'sabor-sorvete',
    });
});

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
            
            const { nome, sabor, quantidade, preco, imagem  } = req.body
            const file = req.file
            
            if( !nome || !sabor || !quantidade || !preco || !file){
                res.status(400).send({message: "Preencha todos os dados!"})
            } else {
                
                const dadosSaborSorvete = {...req.body, imagem: file.filename}
                const saborCadastrado = await saborSorveteModel.create(dadosSaborSorvete);

                const saborResposta = {
                    id: saborCadastrado._id,
                    nome: saborCadastrado.nome,
                    sabor: saborCadastrado.sabor,
                    quantidade: saborCadastrado.quantidade,
                    preco: saborCadastrado.preco,
                    imagem: `/sabor-sorvete/image/${saborCadastrado.imagem}`,
                }

                res.status(201).json({message: "O sabor foi cadastrado com sucesso!", data: saborResposta})

            }

        } catch(error) {
            console.log(error)
            res.status(500).send({ message: "Ocorreu um erro ao cadastrar o sabor" });
        }
    }

    static async atualizaSaborSorvete(req, res) {
        try {

            const { nome, sabor, quantidade, preco, imagem } = req.body
            const file = req.file
            const id = req.params.id

            if(!mongoose.Types.ObjectId.isValid(id)){
                res.status(400).send({message: "Id inválido"})
            } else {
                
                if( !nome && !sabor && !quantidade && !preco && !file  ){
                    res.status(400).send({message: "Preencha um campo para a atualização!"})
                } else {
                    
                    const saborExistente = await saborSorveteModel.findById(id);

                    if(!saborExistente){
                        res.status(404).send({message: "Sabor não encontrado"})
                    } else {

                        if(file){
                            
                            const oldFile = await gfs.find({filename: saborExistente.imagem}).toArray();

                            if(oldFile && oldFile.length !== 0){
                                gfs.delete(oldFile[0]._id);
                            }
                            saborExistente.imagem = file.filename;
                        }

                        await saborExistente.updateOne({
                            nome, sabor, quantidade, preco, imagem,
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

                    const oldFile = await gfs.find({filename: resSabor.imagem}).toArray();
                    
                    if(oldFile && oldFile.length !== 0){
                        gfs.delete(oldFile[0]._id)
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

export default saborSorveteController;