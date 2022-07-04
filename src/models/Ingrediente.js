const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredienteSchema = new Schema({
    nombre: {type: String, required: true},     //Nombre del ingrediente
    description: {type: String, required: false},   //Descripcion opcional 
    precio: {type: Number, required: true},     //Precio en que compran el ingrediente
    unidadMedida: {type: String, required: true},     //Unidad de medida de la cantidad
    cantidad: {type: Number, required: true},   //Cantidad con base en la unidad de medida
    date: {type: Date, default: Date.now},      //Hora y fecha de ingreso al sistema
    user: {type: String, required: true}    //Usuario que ingreso el producto
});

module.exports = mongoose.model('Ingrediente', IngredienteSchema);