import CastError from "./CastError.js";

class ValidationError extends CastError{
    constructor(erro){
        const mensagemDeErro = Object.values(erro.errors).map(e => e.message).join("; ");
    
        super(`Os seguintes erros foram encontrados: ${mensagemDeErro}`);
    }
}

export default ValidationError;