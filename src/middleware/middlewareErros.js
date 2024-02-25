import mongoose from "mongoose";
import InternalError from "../erros/InternalError.js";
import CastError from "../erros/CastError.js";
import NotFoundError from "../erros/NotFoundError.js";
import ValidationError from "../erros/ValidationError.js";


export default function manipulaErros(erro, req, res, next) {
    console.log(`Um erro aconteceu :o\n${erro}`);

    if (erro instanceof mongoose.Error.CastError) {

        // Erro da requisição (como passar um ID que não existe)
        new CastError().respostaErro(res);

    } else if (erro instanceof mongoose.Error.ValidationError) {
        
        // Erro de tipagem
        new ValidationError(erro).respostaErro(res);

    } else if (erro instanceof NotFoundError) {

        // Erro não encontrado
        erro.respostaErro(res);
        
    } else {
        
        // Erro geral
        new InternalError().respostaErro(res);
    }
}

