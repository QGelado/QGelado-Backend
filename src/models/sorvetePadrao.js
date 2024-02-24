import mongoose from "mongoose";

const sorvetePadraoSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    marca: { type: String, require: true },
    preco: { type: Number, require: true },
    sabor: { type: String, require: true },
    quantidade: { type: Number, require: true },
    status: { type: String, require: true },
    descricao: { type: String, require: true },
    imagem: { type: String, require: true },
})

const sorvetePadraoModel = mongoose.model("Sorvete Padrão", sorvetePadraoSchema, "Sorvete Padrão")

export default sorvetePadraoModel;