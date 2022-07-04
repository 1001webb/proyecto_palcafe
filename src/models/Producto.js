const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nombre: {type: String, required: true},
    description: {type: String, required: false},
    precioSugerido: {type: Number, required: true},
    precioSistema: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    tiempoElaboracion: {type: String, required: true},
    costoManoDeObra: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String, required: true}
});

module.exports = mongoose.model('Producto', ProductoSchema);