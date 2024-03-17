import pedidosModel from "../models/pedidos.js";
import sorvetePadraoModel from "../models/sorvetePadrao.js";
import { usuarioModel } from "../models/usuario.js";
import sorvetePersonalizadoModel from "../models/sorvetePersonalizado.js";
import NotFoundError from "../erros/NotFoundError.js";

class PedidosController {

    static async buscaTodosOsPedidos(req, res, next) {
        try {
            const listaDePedidos = await pedidosModel.find({});

            res.status(200).json(listaDePedidos);
        } catch (error) {
            next(error);
        }
    }


    static async buscaUmPedido(req, res, next) {
        try {
            const pedidoId = req.params.id;
            const retornoPedido = await pedidosModel.findById(pedidoId);

            if (retornoPedido !== null) {
                res.status(200).json(retornoPedido);
            } else {
                next(new NotFoundError("Id do pedido não encontrado!"));                
            }

        } catch (error) {
            next(error);
        }
    }


    static async cadastraPedido(req, res, next) {
        try {
            const dadosPedidoRequisicao = req.body;
            const dadosSorvetesBrutos = dadosPedidoRequisicao.sorvetes;
            const dataAtual = new Date();
            const codigoPedido = parseInt("9867" + Math.floor((Math.random() * 1000) + 1));

            const usuarioRetorno = await usuarioModel.findById(dadosPedidoRequisicao.usuario);
            const usuarioSemSenha = {...usuarioRetorno["_doc"], senha: undefined}

            const retornoSorvetes = await Promise.all(dadosSorvetesBrutos.map(async (e) => {
                if (e['tipo'] == "sorvete-padrao") {
                    return await sorvetePadraoModel.findById(e['id']);
                } else {
                    return await sorvetePersonalizadoModel.findById(e['id']);
                }
            }));

            const pedidoFinal = {
                status: "A confirmar",
                data: dataAtual,
                preco: dadosPedidoRequisicao.preco,
                sorvetes: retornoSorvetes,
                usuario: usuarioSemSenha,
                codigo: codigoPedido
            }

            const resultadoPedidoFinal = await pedidosModel.create(pedidoFinal);

            res.status(201).json({message: "Pedido cadastrado com sucesso!", data: resultadoPedidoFinal});
        } catch (error) {
            next(error);
        }
    }

    
    static async atualizaPedido(req, res, next){
        try {
            const idPedido = req.params.id;
            const dadosRequisicao = req.body;

            const retornoAtualizacao = await pedidosModel.findByIdAndUpdate(idPedido, dadosRequisicao);

            if (retornoAtualizacao !== null) {
                const pedidoAtualizado = await pedidosModel.findById(idPedido);
                res.status(200).json({message: "Pedido atualizado!", data: pedidoAtualizado});
            }else{
                next(new NotFoundError("Id do pedido não encontrado!"));
            }
        } catch (error) {
            next(error);
        }
    }

    
    static async deletaPedido(req, res, next){
        try {
            const idPedido = req.params.id;

            const retornoDelecao = await pedidosModel.findByIdAndDelete(idPedido);

            if (retornoDelecao !== null) {
                res.status(200).json({message: "Pedido deletado!"});
            } else {
                next(new NotFoundError("Id do pedido não encontrado!"));                
            }

        } catch (error) {
            next(error);
        }
    }
}

export default PedidosController;