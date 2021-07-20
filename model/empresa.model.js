const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    name: String,
    password: String,
    telefono: String,
    direccion: String
})

module.exports = mongoose.model('Empresas', EmpresaSchema);
