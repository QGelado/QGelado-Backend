import pkgJson from 'jsonwebtoken';

const { verify, decode } = pkgJson;
import Unauthorized from "../erros/Unauthorized.js";

export default async function validaToken(req, res, next) {

    const token = req.headers.authorization;

    if(!token){
       return next(new Unauthorized("Token não informado"))
    }

    const [, tokenRequisicao] = token.split(" ");
    try {
        verify(tokenRequisicao, process.env.JWT_SECRET);
        const { id, email } = await decode(tokenRequisicao);

        req.query.usuarioId = id;
        req.query.usuarioEmail = email;

        return next();
    } catch (error) {
        next(new Unauthorized("Token inválido"))
    }
    
}