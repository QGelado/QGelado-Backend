import { Int32 } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const recipienteSchema = new Schema({
    nome: String,
    tipo: String,
    quantidade: Number,
    preco: Number,
    imagem: String,
});

const recipienteModel = mongoose.model('recipiente', recipienteSchema);

export default recipienteModel;