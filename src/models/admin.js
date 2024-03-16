import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: mongoose.Schema.Types.String, required: [true, "O nome é obrigatória"]},
    email: {type: mongoose.Schema.Types.String, required: [true, "O email é obrigatória"]},
    senha: {type: mongoose.Schema.Types.String, validate: {
        validator: value => {
            const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{20,}$/;
            return (!value || !value.trim().length) || re.test(value)
        },
        message: "Sua senha precisa ter pelo menos um dígito, uma letra minuscula e uma maiúscula e no minimo 20 caracteres!"
    }},
}, {versionKey: false});

const adminModel = mongoose.model("admins", adminSchema);

export {adminModel, adminSchema}