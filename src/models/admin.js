import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: mongoose.Schema.Types.String, required: [true, "O nome é obrigatória"]},
    email: {type: mongoose.Schema.Types.String, required: [true, "O email é obrigatória"]},
    senha: {type: mongoose.Schema.Types.String, validate: {
        validator: value => { 
            return value.toString().length >= 20 
        },
        message: "Sua senha precisa ter pelo menos 20 caracteres!"
    }},
}, {versionKey: false});

const adminModel = mongoose.model("admins", adminSchema);

export {adminModel, adminSchema}