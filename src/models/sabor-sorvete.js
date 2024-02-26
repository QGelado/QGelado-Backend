import mongoose from 'mongoose';
const { Schema } = mongoose;

const saborSorveteSchema = new Schema({
    nome: String,
    sabor: String,
    quantidade: String,
    imagem: String,
});

const saborSorveteModel = mongoose.model('sabor sorvete', saborSorveteSchema);

export default saborSorveteModel;