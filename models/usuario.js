'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UsuarioSchema = Schema({
    email: { type: String, unique: true, lowercase: true },
    nombre: String,
    apellido: String,
    avatar: String,
    password: { type: String, select: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

UsuarioSchema.pre('save', function(next, err) {
    let usuario = this
    if (usuario.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) return next(err)

            usuario.password = hash
            next()
        })
    })
})

UsuarioSchema.methods.gravatar = function() {
    if (!this.email) return `https://gravatar.com/avatar/?s=2005d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=2005d=retro`
}
module.exports = mongoose.model('Usuario', UsuarioSchema)