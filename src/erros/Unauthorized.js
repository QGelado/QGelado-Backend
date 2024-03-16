import InternalError from "./InternalError.js";

class Unauthorized extends InternalError{
    constructor(mensagem = "Usuário ou senha inválidos!"){
        super(mensagem, 401)
    }
}

export default Unauthorized;