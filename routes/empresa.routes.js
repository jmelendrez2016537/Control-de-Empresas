'use strict'

//Impotaciones 
const express = require("express");
const empresaController = require("../controller/empresa.controller");

//Middleware
var md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();

api.post('/registrarEmpresa',md_autenticacion.ensureAuth, empresaController.registrarEmpresa)
api.post('/loginEmpresa', md_autenticacion.ensureAuth, empresaController.loginEmpresa)
api.put('/editarEmpresa/:idEmpresa',md_autenticacion.ensureAuth, empresaController.editarEmpresa)
api.delete('/eliminarEmpresa/:idEmpresa',md_autenticacion.ensureAuth, empresaController.eliminarEmpresa)


module.exports = api;