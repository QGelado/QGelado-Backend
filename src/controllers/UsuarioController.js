import { usuarioModel } from "../models/usuario.js";

class UsuarioController{

    static async buscaUmUsuarioPorId(req, res){
        try {
            const idUsuario = req.params.id;
            const resultadoBusca = await usuarioModel.findById(idUsuario);
            res.status(200).json(resultadoBusca);
        } catch (error) {
            res.status(500).json({message: `Falha na requisição ${error.message}`});
        }
    }
    
}

export default UsuarioController;