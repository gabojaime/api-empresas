'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpresaSchema = Schema({
    razon_social: String,
    rif: String,
    logo: String,
    correo: String,
    categoria: { type: String, enum: ['servicios', 'restaurante', 'tienda'] },
    descripcion: String
})

module.exports = mongoose.model('Empresa', EmpresaSchema)