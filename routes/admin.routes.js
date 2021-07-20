'use strict'

//Impotaciones 
const express = require("express");
const adminController = require("../controller/admin.controller");


//Rutas
var api = express.Router();

//api.post('/registrarAdmin', adminController.registrarAdmin)
api.post('/loginAdmin', adminController.loginAdmin )


module.exports = api;

