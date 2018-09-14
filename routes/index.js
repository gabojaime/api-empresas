'use strict'

const express = require('express')
const empresaController = require('../controllers/empresa')
const api = express.Router()

//rutas crud para empresas 
api.get('/empresas', empresaController.getEmpresas)

api.get('/empresas/:empresaId', empresaController.getEmpresa)

api.post('/empresas', empresaController.storeEmpresa)

api.put('/empresas/:empresaId', empresaController.updateEmpresa)

api.delete('/empresas/:empresaId', empresaController.deleteEmpresa)

module.exports = api