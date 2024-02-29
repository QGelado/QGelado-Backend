import mongoose from "mongoose";

const sorvetePersonalizadoSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    preco: { type: Number, require: true },
    sabores: { type: Array, require: true },
    recipiente: { type: Object, require: true },
    acompanhamentos: { type: Array, require: false },
    imagem: { type: String, require: true },
    descricao: { type: String, require: true },
})

const sorvetePersonalizadoModel = mongoose.model("sorvetes personalizados", sorvetePersonalizadoSchema)

export default sorvetePersonalizadoModel;