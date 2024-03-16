class InternalError extends Error{
    constructor(mensagem = "Erro interno do servidor", status = 500){
        super();

        this.message = mensagem;
        this.status = status;
    }

    respostaErro(res){
        res.status(this.status).json({message: this.message});
    }
}

export default InternalError;