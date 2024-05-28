import NotFoundError from "../erros/NotFoundError.js";
import AlreadyExist from "../erros/AlreadyExist.js";
import Unauthorized from "../erros/Unauthorized.js";
import { usuarioModel } from "../models/index.js";
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import pkgJson from 'jsonwebtoken';
import pkgMongo from 'mongodb';
const { ObjectID } = pkgMongo;
const { sign, verify, decode } = pkgJson;

class UsuarioController {

    static async buscaTodosOsUsuario(req, res, next) {
        try {
    
            const resultadoBusca = await usuarioModel.find({});
            const resultadoBuscasSemSenhas = resultadoBusca.map(e => { 
                const objetoAtual = e["_doc"];
                return {...objetoAtual, senha: undefined}
            });

            res.status(200).json(resultadoBuscasSemSenhas);
        } catch (error) {
            next(error);
        }
    }


    static async buscaUmUsuarioPorId(req, res, next) {
        try {
            const idUsuario = req.params.id;
            const resultadoBusca = await usuarioModel.findById(idUsuario);

            if (resultadoBusca !== null) {

                // Excluir a senha das respostas
                const resultadoBuscaSemSenha = {...resultadoBusca["_doc"], senha: undefined}

                res.status(200).json(resultadoBuscaSemSenha);
            } else {
                next(new NotFoundError("ID do usuário não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    }

    static async buscaUmUsuarioPorToken(req, res, next) {
        try {
            const { usuarioEmail, usuarioId }  = req.query
       
            const resultadoBusca = await usuarioModel.findById(usuarioId);

            if (resultadoBusca !== null) {
                console.log(resultadoBusca)
                res.status(200).json(resultadoBusca);
            } else {
                next(new NotFoundError("ID do usuário não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    }


    static async criaUmNovoUsuario(req, res, next) {
        try {
            let dadosRequisicao = req.body;
            const emailRequisicao = dadosRequisicao.email
            console.log(emailRequisicao)
            const usuarioExiste = await usuarioModel.find({email: emailRequisicao});

            if (usuarioExiste.length === 0) {

                const senhaHash = await hash(dadosRequisicao.senha, 8);
                dadosRequisicao = {...dadosRequisicao, senha: senhaHash}

                const token = sign({_id: usuarioExiste._id, email: usuarioExiste.email}, process.env.JWT_SECRET, {expiresIn: 86400});

                const resultadoCriacao = await usuarioModel.create(dadosRequisicao);
                res.status(201).json({ message: "Usuário Cadastrado com sucesso!", token: token, data: resultadoCriacao });
            }else{
                next(new AlreadyExist());
            }

        } catch (error) {
            next(error);
        }
    }


    static async atualizarUsuario(req, res, next) {
        try {
            const idUsuario = req.params.id;
            const dadosRequisicao = req.body;
            const respostId = await usuarioModel.findByIdAndUpdate(idUsuario, dadosRequisicao);

            if (respostId !== null) {
                const resultadoAtualizacao = await usuarioModel.findById(idUsuario);
                res.status(200).json({ message: "Dados do usuário atualizados!", data: resultadoAtualizacao });
            } else {
                next(new NotFoundError("ID do usuário não encontrado"));
            }

        } catch (error) {
            next(error);
        }
    }


    static async deletaUsuario(req, res, next) {
        try {
            const idUsuario = req.params.id;
            const respostId = await usuarioModel.findByIdAndDelete(idUsuario);

            if (respostId !== null) {
                res.status(200).json({ message: "Usuário deletado com sucesso!" });
            } else {
                next(new NotFoundError("ID do usuário não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next){
        try {
            const {email, senha} = req.body;
            const senhaHash = await hash(senha, 8);
            
            const usuarioExiste = await usuarioModel.find({email: email});

            if (usuarioExiste.length === 0) {
                next(new NotFoundError("Usuário não encontrado"));
            }else{
                const comparacaoDeSenhas = await compare(senha, senhaHash);
                if(!comparacaoDeSenhas){
                    next(new Unauthorized());
                }else{

                    // Token tudo 1 dia

                    const token = sign({id: usuarioExiste[0]._id, email: usuarioExiste[0].email}, process.env.JWT_SECRET, {expiresIn: 86400});
                    console.log(token);
                    console.log(process.env.JWT_SECRET);
                    var decoded = verify(token, process.env.JWT_SECRET);
                    console.log(decode(token))
                    console.log(decoded)
                    res.status(200).json({message: "Usuário autenticado com sucesso!", usuarioExiste, token: token});
                }
            }
        
        } catch (error) {
            next(error)
        }
    }

}

export default UsuarioController;