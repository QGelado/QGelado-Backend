import InternalError from "./InternalError.js";

class AlreadyExist extends InternalError{
    constructor(mensagem = "Usuário já cadastrado no sistema!"){
        super(mensagem, 409);
    }
}

export default AlreadyExist;