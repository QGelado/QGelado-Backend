import mongoose from "mongoose";

const sorvetePadraoSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "O nome é obrigatório para cadastrar um sorvete"] },
    marca: { type: String, required: [true, "A marca é obrigatória para cadastrar um sorvete"] },
    preco: { type: Number, required: [true, "O preço é obrigatório para cadastrar um sorvete"] },
    sabor: { type: String, required: [true, "O sabor é obrigatório para cadastrar um sorvete"] },
    quantidade: { type: Number, required: [true, "A quantidade é obrigatória para cadastrar um sorvete"] },
    status: { type: String, required: [true, "O status é obrigatório para cadastrar um sorvete"] },
    descricao: { type: String, required: [true, "A descrição é obrigatória para cadastrar um sorvete"] },
    imagem: { type: String, required: [true, "A imagem é obrigatória para cadastrar um sorvete"] },
})

const sorvetePadraoModel = mongoose.model("sorvetes padrões", sorvetePadraoSchema)

export default sorvetePadraoModel;