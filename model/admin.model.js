const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    user: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('Admin', AdminSchema)
