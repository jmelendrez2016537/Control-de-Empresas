'use strict'

//Importaciones
const Empleado = require('../model/empleado.model');
const bcrypt = require("bcrypt-nodejs");
const { models } = require('mongoose');

function registrarEmpleado(req, res) {
    var empleadoModel = new Empleado();
    var params = req.body;

    if (params.name && params.user && params.password && params.puesto && params.departamento && params.idEmpresa){
        empleadoModel.name = params.name;
        empleadoModel.user = params.user;
        empleadoModel.password = params.password;
        empleadoModel.puesto = params.puesto;
        empleadoModel.departamento = params.departamento;
        empleadoModel.idEmpresa = params.idEmpresa;
        if(req.empresa.sub != empleadoModel.idEmpresa){
            console.log(req.empresa.sub, empleadoModel.idEmpresa)
            return res.status(500).send({mensaje: 'No se puede ingresar este empleado a su empresa'});
        }
        Empleado.find({ $or: [
            {user: empleadoModel.user },
            {password: empleadoModel.password }
        ] }).exec((err, empleadoEncontrado) => {
            if(err) return res.status(500).send({mensaje: 'Error en la peticion del Empleado'})
            
            if(empleadoEncontrado && empleadoEncontrado.length >=1){
                return res.status(500).send({mensaje: 'El empleado ya existe'})
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) =>{
                    empleadoModel.password = passwordEncriptada;

                    empleadoModel.save((err, empleadoGuardado) =>{
                        if(err) return res.status(500).send({mensaje: 'Error al guardar el Empleado'})

                        if(empleadoGuardado) {
                            return res.status(200).send({empleadoGuardado})
                        }else{
                            return res.status(404).send({mensaje: 'No se ha podido registrar al Empleado'})
                        }
                    })
                })
            }
        })
    }
}

function editarEmpleado(req, res){
    var idEmpleado = req.params.idEmpleado;
    var params = req.body;

    delete params.password;

    Empleado.findByIdAndUpdate(idEmpleado, params, { new: true }, (err, empleadoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!empleadoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el Empleado'});
        return res.status(200).send({ empleadoActualizado});
    })
}

function eliminarEmpleado (req, res){
    const idEmpleado = req.params.idEmpleado;

    Empleado.findByIdAndDelete(idEmpleado, (err, empleadoEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de Eliminar'});
        if(!empleadoEliminado) return res.status(200).send({mensaje: 'Error al eliminar el Empleado'});

        return res.status(200).send({empleadoEliminado});
    })
}

function empleadoID(req, res) {
    var idEmpleado = req.params.idEmpleado

    Empleado.findById(idEmpleado, (err, empleadoEncontrado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en  la peticion del Empleado'})
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error en obtener los datos del Empleado'})
        console.log(empleadoEncontrado.email);
        return res.status(200).send({ empleadoEncontrado})
    })
}

function empleadoNombre(req, res) {
    var nombreEmpleado = req.params.nombreEmpleado

    Empleado.findById(nombreEmpleado, (err, empleadoEncontrado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en  la peticion del Empleado'})
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error en obtener los datos del Empleado'})
        console.log(empleadoEncontrado.email);
        return res.status(200).send({ empleadoEncontrado})
    })
}

function empleadoPuesto(req, res) {
    var puestoEmpleado = req.params.puestoEmpleado

    Empleado.findById(puestoEmpleado, (err, empleadoEncontrado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en  la peticion del Empleado'})
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error en obtener los datos del Empleado'})
        console.log(empleadoEncontrado.email);
        return res.status(200).send({ empleadoEncontrado})
    })
}

function empleadoDepartamento(req, res) {
    var departamentoEmpleado = req.params.departamentoEmpleado

    Empleado.findById(departamentoEmpleado, (err, empleadoEncontrado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en  la peticion del Empleado'})
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error en obtener los datos del Empleado'})
        console.log(empleadoEncontrado.email);
        return res.status(200).send({ empleadoEncontrado})
    })
}

function empleadoEmpresa(req, res) {
    var empresaEmpleado = req.params.empresaEmpleado

    Empleado.findById(empresaEmpleado, (err, empleadoEncontrado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en  la peticion del Empleado'})
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error en obtener los datos del Empleado'})
        console.log(empleadoEncontrado.email);
        return res.status(200).send({ empleadoEncontrado})
    })
}

module.exports = {
    registrarEmpleado,
    editarEmpleado,
    eliminarEmpleado,
    empleadoID,
    empleadoNombre,
    empleadoPuesto,
    empleadoDepartamento,
    empleadoEmpresa
}