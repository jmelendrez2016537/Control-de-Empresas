'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_IN6BM';

exports.createToken = function (empresa) {
    var playload = {
        sub: empresa._id,
        name: empresa.name,
        telefono: empresa.telefono,
        direccion: empresa.direccion,
        iat: moment().unix(),
        exp: moment().day(10, 'day').unix()
    }

    return jwt.encode(playload, secret);
}
