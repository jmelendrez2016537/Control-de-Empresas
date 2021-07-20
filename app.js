'use strict'

//Variables Globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const adminController = require("./controller/admin.controller");

//Importacion rutas
const adminRoutes = require("./routes/admin.routes")
const empresaRoutes = require("./routes/empresa.routes")
const empleadoRoutes = require("./routes/empleado.routes")

//Middlewares
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//Cabeceras
app.use(cors());

//Carga de rutas
adminController.registrarAdmin();
app.use('/api', adminRoutes)
app.use('/api', empresaRoutes)
app.use('/api',empleadoRoutes)


//Exportar
module.exports = app;
