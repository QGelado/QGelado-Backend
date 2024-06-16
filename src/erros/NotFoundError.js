import InternalError from "./InternalError.js";

class NotFoundError extends InternalError{
    constructor(mensagem = "Não encontrado"){
        super(mensagem, 404);
    }
}

export default NotFoundError;