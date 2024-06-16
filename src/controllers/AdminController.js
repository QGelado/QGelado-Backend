import { adminModel } from "../models/admin.js";
import NotFoundError from "../erros/NotFoundError.js"
import AlreadyExist from "../erros/AlreadyExist.js"
import Unauthorized from "../erros/Unauthorized.js"
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import pkgJson from 'jsonwebtoken';
const { sign } = pkgJson;

class AdminController{

    static async buscaUmAdmin(req, res, next){
        try {
            const idAdmin = req.params.id;
            const resultadoAdmin = await adminModel.findById(idAdmin);
            
            if(resultadoAdmin !== null){
                const resultadoAdminSemSenha = {...resultadoAdmin['_doc'], senha: undefined};

                res.status(200).json(resultadoAdminSemSenha);
            }else{
                next(new NotFoundError("ID do admin não encontrado!"));
            }

        } catch (error) {
            next(error);
        }
    }

    static async criaUmNovoAdmin(req, res, next){
        try {
            let dadosAdmin = req.body;
            const emailRequisicao = dadosAdmin.email;

            const temAdmin = await adminModel.find({email: emailRequisicao});

            if(temAdmin.length === 0){
                const senhaComHash = await hash(dadosAdmin.senha, 8);
                dadosAdmin = {...dadosAdmin, senha: senhaComHash};

                const token = sign({_id: temAdmin._id, email: temAdmin.email}, process.env.JWT_SECRET, {expiresIn: 86400});

                const retornoAdminCriado = await adminModel.create(dadosAdmin);
                res.status(201).json({message: "Admin criado!", data: retornoAdminCriado, token: token});
            }else{
                next(new AlreadyExist("Admin já cadastrado! Faça Login!"));
            }

        } catch (error) {
            next(error);
        }
    }

    static async atualizaUmAdmin(req, res, next){
        try {
            const idAdmin = req.params.id;
            const dadosAdmin = req.body;

            await adminModel.findByIdAndUpdate(idAdmin, dadosAdmin);
            const retornoAtualizacao = await adminModel.findById(idAdmin);
            
            if (retornoAtualizacao !== null) {
                res.status(200).json({message: "Admin atualizado!", data: retornoAtualizacao});
            }else{
                next(new NotFoundError("ID do admin não encontrado!"));
            }

        } catch (error) {
            next(error);
        }
    }

    static async deletaUmAdmin(req, res, next){
        try {
            const idAdmin = req.params.id;
            const respostaDelecao = await adminModel.findByIdAndDelete(idAdmin);
            
            if (respostaDelecao !== null) {
                res.status(200).json({message: "Admin deletado com sucesso!"})                
            } else {
                next(new NotFoundError("ID do admin não encontrado!"));
            } 
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next){
        try {
            const dadosRequisicao = req.body;

            const temAdmin = await adminModel.find({email: dadosRequisicao.email});

            if (temAdmin.length === 0) {
                next(new NotFoundError("Admin não encontrado! Faça o cadastro!"));
            }else{
                const comparaSenhas = await compare(dadosRequisicao.senha, temAdmin[0]['senha']);

                if (!comparaSenhas) {
                    next(new Unauthorized());
                }else{
                    const token = sign({_id: temAdmin._id, email: temAdmin.email}, process.env.JWT_SECRET, {expiresIn: 86400});

                    res.status(200).json({message: "Admin autenticado com sucesso!", temAdmin, token: token});
                }
            }


        } catch (error) {
            next(error);
        }
    }
}

export default AdminController;