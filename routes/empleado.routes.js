'use strict'

//Impotaciones 
const express = require("express");
const empleadoController = require("../controller/empleado.controller");


//Rutas
var api = express.Router();

api.post('/registrarEmpleado', empleadoController.registrarEmpleado)
api.put('/editarEmpresa/:idEmpleado', empleadoController.editarEmpleado)
api.delete('/eliminarEmpresa/:idEmpleado', empleadoController.eliminarEmpleado)
api.get('/empleadoID/:idEmpleado', empleadoController.empleadoID)
api.get('/empleadoNombre/:nombreEmpleado', empleadoController.empleadoNombre)
api.get('/empleadoPuesto/:puestoEmpleado', empleadoController.empleadoPuesto)
api.get('/empleadoDepartamento/:departamentoEmpleado', empleadoController.empleadoDepartamento)

module.exports = api;