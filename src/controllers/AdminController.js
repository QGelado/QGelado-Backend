import { adminModel } from "../models/admin.js";

class AdminController{

    static async buscaTodosOsAdmin(req, res){
        try {
            const resultadoAdmin = await adminModel.find({});

            res.status(200).json(resultadoAdmin);
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }

    static async buscaUmAdmin(req, res){
        try {
            const idAdmin = req.params.id;
            const resultadoAdmin = await adminModel.findById(idAdmin);

            res.status(200).json(resultadoAdmin);
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}` });
        }
    }

    static async criaUmNovoAdmin(req, res){
        try {
            const dadosAdmin = req.body;
            const retornoAdminCriado = await adminModel.create(dadosAdmin);

            res.status(201).json({message: "Admin criado!", data: retornoAdminCriado});
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }

    static async atualizaUmAdmin(req, res){
        try {
            const idAdmin = req.params.id;
            const dadosAdmin = req.body;

            await adminModel.findByIdAndUpdate(idAdmin, dadosAdmin);
            const retornoAtualizacao = await adminModel.findById(idAdmin);

            res.status(200).json({message: "Admin atualizado!", data: retornoAtualizacao});
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }

    static async deletaUmAdmin(req, res){
        try {
            const idAdmin = req.params.id;
            await adminModel.findByIdAndDelete(idAdmin);

            res.status(200).json({message: "Admin deletado com sucesso!"})
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }

}

export default AdminController;