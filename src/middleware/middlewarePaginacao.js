import CastError from "../erros/CastError.js";

async function paginacao(req, res, next) {
    try {
        let { limite = 2, pagina = 1, ordenacao = "data:-1" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultadoController = req.resultado;

        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultadoController.find()
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite);

            res.status(200).json(resultadoPaginado);
        } else {
            next(new CastError());
        }
    } catch (error) {
        next(error);
    }
}

export default paginacao;