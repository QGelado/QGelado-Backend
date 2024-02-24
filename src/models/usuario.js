import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: mongoose.Schema.Types.String, require: true },
    email: { type: mongoose.Schema.Types.String, require: true },
    endereco: { type: mongoose.Schema.Types.String },
    senha: { type: mongoose.Schema.Types.String, require: true },
    telefone: { type: mongoose.Schema.Types.String }
}, { versionKey: false });

const usuarioModel = mongoose.model("Usuarios", usuarioSchema);

export { usuarioModel, usuarioSchema }
