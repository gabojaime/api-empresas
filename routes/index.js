'use strict'

const express = require('express')
const empresaController = require('../controllers/empresa')
const usuarioController = require('../controllers/usuario')
const auth = require('../middleware/auth')
const api = express.Router()

//rutas crud para empresas 
api.get('/empresas', empresaController.getEmpresas)

api.get('/empresas/:empresaId', empresaController.getEmpresa)

api.post('/empresas', empresaController.storeEmpresa)

api.put('/empresas/:empresaId', empresaController.updateEmpresa)

api.delete('/empresas/:empresaId', empresaController.deleteEmpresa)

//rutas para usuarios
api.post('/signup', usuarioController.signUp)

api.post('/signin', usuarioController.signIn)

api.get('/usuarios', usuarioController.getUsuarios)

//ruta para autorizacion
api.get('/private', auth, (req, res) => {
    res.status(200).send({ mensaje: 'tienes aceso' })
})

module.exports = api