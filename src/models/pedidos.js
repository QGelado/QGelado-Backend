import mongoose from "mongoose";
import { usuarioSchema } from "./usuario.js";

const pedidosSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    codigo: {type: mongoose.Schema.Types.Number},
    status: {type: mongoose.Schema.Types.String, 
    enum: {
        values: ["A confirmar", "Finalizado"],
        message: `{VALUE} não é um status permitido!`
    }},
    data: {type: mongoose.Schema.Types.Date},
    preco: {type: mongoose.Schema.Types.Decimal128, required: [true, "Os sorvetes são obrigatórios!"]},
    usuario: usuarioSchema,
    sorvetes: {type: mongoose.Schema.Types.Array, required: [true, "Os sorvetes são obrigatórios!"]}
}, {versionKey: false});

const pedidosModel = mongoose.model("pedidos", pedidosSchema);

export default pedidosModel;
