'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(usuario) { //funcion que crea token de usuario
    const payload = {
        sub: usuario._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    mensaje: 'El token ha expirado'
                })
            }

            resolve(payload.sub)

        } catch (error) {
            reject({
                status: 500,
                mensaje: 'Invalid Token'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}