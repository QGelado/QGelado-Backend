import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: mongoose.Schema.Types.String, required: [true, "O nome é obrigatória"]},
    email: {type: mongoose.Schema.Types.String, required: [true, "O email é obrigatória"]},
    senha: {type: mongoose.Schema.Types.String, required: [true, "A senha é obrigatória"]},
}, {versionKey: false});

const adminModel = mongoose.model("admins", adminSchema);

export {adminModel, adminSchema}