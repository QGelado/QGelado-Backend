import mongoose from 'mongoose';

const { Schema } = mongoose;

const acompanhamentoSchema = new Schema({
    nome: String,
    tipo: String,
    preco: Number,
    quantidade: String,
    imagem: String,
});

const acompanhamentoModel = mongoose.model('acompanhamento', acompanhamentoSchema);

export default acompanhamentoModel;