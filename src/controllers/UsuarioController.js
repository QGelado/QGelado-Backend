import NotFoundError from "../erros/NotFoundError.js";
import AlreadyExist from "../erros/AlreadyExist.js";
import { usuarioModel } from "../models/index.js";

class UsuarioController {

    static async buscaTodosOsUsuario(req, res, next) {
        try {
            const resultadoBusca = await usuarioModel.find({});
            res.status(200).json(resultadoBusca);
        } catch (error) {
            next(error);
        }
    }


    static async buscaUmUsuarioPorId(req, res, next) {
        try {
            const idUsuario = req.params.id;
            const resultadoBusca = await usuarioModel.findById(idUsuario);

            if (resultadoBusca !== null) {
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
            const dadosRequisicao = req.body;
            const emailRequisicao = dadosRequisicao.email

            const usuarioExiste = await usuarioModel.find({email: emailRequisicao})

            if (usuarioExiste.length === 0) {
                const resultadoCriacao = await usuarioModel.create(dadosRequisicao);
                res.status(201).json({ message: "Usuário Cadastrado com sucesso!", data: resultadoCriacao });
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

}

export default UsuarioController;