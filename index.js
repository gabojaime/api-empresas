'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//rutas crud para empresas 
app.get('/api/empresas', (req, res) => {
    res.status(200).send({ empresas: [] })
})

app.get('/api/empresas/:empresaId', (req, res) => {

})

app.post('/api/empresas', (req, res) => {
    console.log(req.body)
    res.status(200).send({ mensaje: 'Se han recibido los datos de empresa' })
})

app.put('/api/empresas/:empresaId', (req, res) => {

})

app.delete('/api/empresas/:empresaId', (req, res) => {

})

app.listen(port, () => {
    console.log(`api rest corriendo en puerto ${port}`)
})