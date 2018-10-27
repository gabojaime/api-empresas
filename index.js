'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

//conexion con base de datos mongodb
mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        return console.log(`error al conectar a la base de datos: ${err}`)
    }
    console.log('conexion establecida')

    app.listen(config.port, () => {
        console.log(`api rest corriendo en puerto ${config.port}`)
    })
})