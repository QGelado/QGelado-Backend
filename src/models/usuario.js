import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: mongoose.Schema.Types.String, required: [true, "O nome é obrigatório para cadastrar um usuário"] },
    email: { type: mongoose.Schema.Types.String, required: [true, "O email é obrigatório para cadastrar um usuário"] },
    endereco: { type: mongoose.Schema.Types.String },
    senha: {
        type: mongoose.Schema.Types.String,
        validate: {
            validator: value => { 
                return value.toString().length >= 16 
            },
            message: "Sua senha precisa ter pelo menos 16 caracteres!"
        },
    },
    telefone: {
        type: mongoose.Schema.Types.Number,
        validate: {
            validator: value => {
                const telefone = value.toString()
                const tamanhoTelefone = telefone.length;
                return tamanhoTelefone == 11
            },
            message: "O telefone precisa ter 11 números!"
        }
    },
    tokenNotifications: { type: mongoose.Schema.Types.String }
}, { versionKey: false });

const usuarioModel = mongoose.model("usuarios", usuarioSchema);

export { usuarioModel, usuarioSchema }
