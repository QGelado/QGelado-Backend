import InternalError from "./InternalError.js";

class CastError extends InternalError{
    constructor(mensagem = "Um ou mais dados fornecidos na requisição estão incorretos"){
        super(mensagem, 400);
    }
}

export default CastError;