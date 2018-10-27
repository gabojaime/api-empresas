'use strict'

const mongoose = require('mongoose')
const Usuario = require('../models/usuario')
const service = require('../services') //importar servicio para crear token

function signUp(req, res) {
    const usuario = new Usuario({
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    })

    usuario.save((err) => {
        if (err) return res.status(500).send({ mensaje: `Error al crear el usuario: ${err}` })

        return res.status(200).send({ token: service.createToken(usuario) })
    })
}

function signIn(req, res) {
    Usuario.find({ email: req.body.email }, (err, usuario) => {
        if (err) return res.status(500).send({ mensaje: err })

        if (!usuario) return res.status(404).send({ mensaje: 'No existe el usuario' })

        req.usuario = usuario
        res.status(200).send({
            mensaje: 'Usuario logueado',
            token: service.createToken(usuario)
        })
    })
}

function getUsuarios(req, res) {
    Usuario.find({}, (err, usuarios) => {
        if (err) return res.status(500).send({ mensaje: `Error al realizar la peticion: ${err}` })
        if (usuarios.length == 0) return res.status(404).send({ mensaje: 'No existen usuarios' })

        res.status(200).send({ usuarios })
    })
}

module.exports = {
    signUp,
    signIn,
    getUsuarios
}