'use strict'

//Importaciones
const Empresa = require('../model/empresa.model');
const bcrypt = require("bcrypt-nodejs")
const jwt = require('../services/empresa.jwt')

function registrarEmpresa(req, res) {
    var empresaModel = new Empresa();
    var params = req.body;
    if(req.admin.rol === "Admin"){
        if (params.name && params.password && params.telefono && params.direccion){
            empresaModel.name = params.name;
            empresaModel.telefono = params.telefono;
            empresaModel.direccion = params.direccion;

            Empresa.find({ $or: [
                {name: empresaModel.name},
                {telefono: empresaModel.telefono},
                {direccion: empresaModel.direccion}
                ]}).exec((err, empresasEncontradas)=>{
                    if(err) return res.status(500).send({mensaje: 'Error en la peticion de la Empresa'})

                    if(empresasEncontradas && empresasEncontradas.length >=1){
                    return res.status(500).send({mensaje: 'La empresa ya existe'})
                    } else {
                        bcrypt.hash(params.password, null, null, (err, passwordEncriptada)=>{
                        empresaModel.password = passwordEncriptada;

                        empresaModel.save((err, empresaGuardada)=>{
                                if(err) return res.status(500).send({mensaje: 'Error al guardar la Empresa'})

                                if(empresaGuardada) {
                                    res.status(200).send(empresaGuardada)
                                }else{
                                    res.status(404).send({mensaje: 'No se ha podido registrar la Empresa'})
                                }
                        })
                    })
                }
            })
        }
    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para eliminar esta Empresa'})
    }
}

function loginEmpresa(req, res) {
    var params = req.body;
    if(req.admin.rol === "Admin"){
        Empresa.findOne({name: params.name}, (err, empresaEncontrada)=>{
            if(err) return req.status(500).send({mensaje: 'Error en la peticion'});

            if(empresaEncontrada){
                bcrypt.compare(params.password, empresaEncontrada.password, (err, passCorrecta)=>{
                    if(passCorrecta){
                        if(params.obtenerToken === "true"){
                            return res.status(200).send({
                                token: jwt.createToken(empresaEncontrada)
                            })
                        }else {
                            empresaEncontrada.password = undefined;
                            return res.status(200).send({ empresaEncontrada})
                        }
                    }else{
                        return res.status(404).send({mensaje: 'La empresa no se ha podido identificar'})
                    }
                })
            }else{
                return res.status(404).send({mensaje: 'El usuario ha podido ingresar'})
            }
        })
    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para eliminar esta Empresa'})
    }
}

function editarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var params = req.body;
    
        delete params.password;

    if(req.admin.rol === "Admin"){
            
        

        Empresa.findByIdAndUpdate(idEmpresa, params, { new: true}, (err, empresaActualizada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!empresaActualizada) return res.status(500).send({mensaje: 'No se ha podido actualizar la Empresa'});
            return res.status(200).send({empresaActualizada});
        })
    } else{
        return res.status(500).send({mensaje: 'No posees los permisos necesarios para actualizar este Usuario'})
    }
}

function eliminarEmpresa (req, res){
    const idEmpresa = req.params.idEmpresa;
    
    if(req.admin.rol === "Admin"){
            
        Empresa.findByIdAndDelete(idEmpresa, (err, empresaEliminada)=>{
            if(err) return res.status(500).send({mensaje: 'Erroe en la peticion eliminar'});
            if(!empresaEliminada) return res.status(200).send({mensaje: 'Error al eliminar la Empresa'});
            
            return res.status(200).send({empresaEliminada});
        })
    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para eliminar esta Empresa'})
    }
}

module.exports = {
    registrarEmpresa,
    loginEmpresa,
    editarEmpresa,
    eliminarEmpresa
}
