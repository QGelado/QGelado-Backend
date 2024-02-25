import { usuarioModel } from "../models/usuario.js";

class UsuarioController {

    static async buscaTodosOsUsuario(req, res){
        try {
            const resultadoBusca = await usuarioModel.find({});
            res.status(200).json(resultadoBusca);
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }


    static async buscaUmUsuarioPorId(req, res) {
        try {
            const idUsuario = req.params.id;
            const resultadoBusca = await usuarioModel.findById(idUsuario);
            res.status(200).json(resultadoBusca);
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição ${error.message}` });
        }
    }

    static async criaUmNovoUsuario(req, res) {
        try {
            const dadosRequisicao = req.body;
            const resultadoCriacao = await usuarioModel.create(dadosRequisicao);
            res.status(201).json({ message: "Usuário Cadastrado com sucesso!", data: resultadoCriacao });
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição ${error.message}` });
        }
    }

    static async atualizarUsuario(req, res){
        try {
            const idUsuario = req.params.id;
            const dadosRequisicao = req.body;
            await usuarioModel.findByIdAndUpdate(idUsuario, dadosRequisicao);
            const resultadoAtualizacao = await usuarioModel.findById(idUsuario);
            res.status(200).json({message: "Dados do usuário atualizados!", data: resultadoAtualizacao});
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }

    static async deletaUsuario(req, res){
        try {
            const idUsuario = req.params.id;
            await usuarioModel.findByIdAndDelete(idUsuario);
            res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }

}

export default UsuarioController;