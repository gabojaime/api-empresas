'use strict'

const express = require('express')
const empresaController = require('../controllers/empresa')
const usuarioController = require('../controllers/usuario')
const auth = require('../middleware/auth')
const api = express.Router()

//rutas crud para empresas 
api.get('/empresas', auth, empresaController.getEmpresas)

api.get('/empresas/:empresaId', auth, empresaController.getEmpresa)

api.post('/empresas', auth, empresaController.storeEmpresa)

api.put('/empresas/:empresaId', auth, empresaController.updateEmpresa)

api.delete('/empresas/:empresaId', auth, empresaController.deleteEmpresa)

//rutas para usuarios
api.post('/signup', usuarioController.signUp)

api.post('/signin', usuarioController.signIn)

api.get('/usuarios', usuarioController.getUsuarios)

//ruta para autorizacion
api.get('/private', auth, (req, res) => {
    res.status(200).send({ mensaje: 'tienes aceso' })
})

module.exports = api