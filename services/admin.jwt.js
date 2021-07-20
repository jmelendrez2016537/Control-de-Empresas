'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_IN6BM';

exports.createToken = function (admin) {
    var playload = {
        sub: admin._id,
        user: admin.user,
        rol: admin.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'day').unix()
    }
    return jwt.encode(playload, secret);
}