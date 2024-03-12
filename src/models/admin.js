import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: mongoose.Schema.Types.String, required: true},
    email: {type: mongoose.Schema.Types.String, required: true},
    senha: {type: mongoose.Schema.Types.String, required: true},
}, {versionKey: false});

const adminModel = mongoose.model("admins", adminSchema);

export {adminModel, adminSchema}