'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'clave_secreta_IN6BM'

exports.ensureAuth = function (req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send({ mensaje: 'La peticion no tiene cabezera de atorizacion'})
    }
    
    var token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        var playload = jwt.decode(token, secret)
        if (playload.exp <= moment().unix()){
            return res.status(401).send({
                mensaje: 'El token ha expirado'
            })
        }
    }catch (error) {
        return res.status(404).send({
            mensaje: 'El token no es valido'
        });
    }
    req.empresa = playload;
    next();
}