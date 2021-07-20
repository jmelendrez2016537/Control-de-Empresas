const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmpleadoSchema = Schema({
    name: String,
    user: String,
    password: String,
    puesto: String,
    departamento: String,
    idEmpresa: {type: Schema.ObjectId, ref:'Empresas'}
})

module.exports = mongoose.model('Empleados', EmpleadoSchema)
