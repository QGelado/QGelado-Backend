import { adminModel } from "../models/admin.js";
import NotFoundError from "../erros/NotFoundError.js"

class AdminController{

    static async buscaTodosOsAdmin(req, res, next){
        try {
            const resultadoAdmin = await adminModel.find({});

            res.status(200).json(resultadoAdmin);
        } catch (error) {
            next(error);
        }
    }

    static async buscaUmAdmin(req, res, next){
        try {
            const idAdmin = req.params.id;
            const resultadoAdmin = await adminModel.findById(idAdmin);

            if(resultadoAdmin !== null){
                res.status(200).json(resultadoAdmin);
            }else{
                next(new NotFoundError("ID do admin não encontrado!"));
            }

        } catch (error) {
            next(error);
        }
    }

    static async criaUmNovoAdmin(req, res, next){
        try {
            const dadosAdmin = req.body;
            const retornoAdminCriado = await adminModel.create(dadosAdmin);

            res.status(201).json({message: "Admin criado!", data: retornoAdminCriado});
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
}

export default AdminController;