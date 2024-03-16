import mongoose from "mongoose";

const sorvetePersonalizadoSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "O nome é obrigatório para cadastrar um sorvete personalizado"] },
    preco: { type: Number, required: [true, "O preço é obrigatório para cadastrar um sorvete personalizado"] },
    sabores: { type: Array, required: [true, "Os sabores são obrigatórios para cadastrar um sorvete personalizado"] },
    recipiente: { type: Object, required: [true, "O recipienet é obrigatório para cadastrar um sorvete personalizado"] },
    acompanhamentos: { type: Array, required: false },
    imagem: { type: String, required: [true, "A imagem é obrigatória para cadastrar um sorvete personalizado"] },
    descricao: { type: String, required: [true, "A descrição é obrigatória para cadastrar um sorvete personalizado"] },
})

const sorvetePersonalizadoModel = mongoose.model("sorvetes personalizados", sorvetePersonalizadoSchema)

export default sorvetePersonalizadoModel;