'use strict'

//Importaciones
const Admin = require('../model/admin.model');
const bcrypt = require("bcrypt-nodejs")
const jwt = require('../services/admin.jwt')

//Function Registrar Admin
function registrarAdmin(req, res) {
    var adminModel = new Admin();

    var usuario = "Admin";
    var password = "123456";
    var rol = "Admin";
    if (usuario && password){
        adminModel.user = usuario; 
        adminModel.password = password;
        adminModel.rol = rol;
        Admin.find({ $or: [
            {user: adminModel.user }
        ]}).exec((err, adminEncontrados)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion del Administrador'})
            if(adminEncontrados && adminEncontrados.length >=1){
                return res.status(500).send({ mensaje: 'Error en la solicitud' })
            } else{
                bcrypt.hash(password, null, null, (err, passwordEncriptada) =>{
                    adminModel.password = passwordEncriptada;

                    adminModel.save((err, adminGuardado)=>{
                        if(err) return res.status(500).send({ mensaje: 'Error al guardar el Administrador'})

                        if(adminGuardado) {
                            return res.status(200).send({adminGuardado})
                        } else{
                            return res.status(404).send({ mensaje: 'No se ha podido registrar el administrador'})
                        }
                    })
                })
            }
        })
    }
}

//Fuction Login Admin
function loginAdmin(req, res) {
    var params = req.body;

    Admin.findOne({user: params.user}, (err, adminEncontrado)=>{
        if(err) return req.status(500).send({ mensaje: 'Error en la peticion'});

        if(adminEncontrado){
            bcrypt.compare(params.password, adminEncontrado.password, (err, passCorrecta)=>{
                if(passCorrecta){
                    if(params.obtenerToken === "true"){
                        return res.status(200).send({
                            token: jwt.createToken(adminEncontrado)
                        })
                    }else {
                        adminEncontrado.password = undefined;
                        return res.status(200).send({ adminEncontrado})
                    }
                }else {
                    return res.status(404).send({ mensaje: 'El admin no se ha podido identificar'})
                }
            })
        }else {
            return res.status(404).send({ mensaje: 'El admin no ha podido ingresar'})
        }
    })
}

module.exports = {
    registrarAdmin,
    loginAdmin
}