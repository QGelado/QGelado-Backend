import NotFoundError from "../erros/NotFoundError.js";

export default function manipula404(req, res, next){
    const erro = new NotFoundError();

    next(erro);
}