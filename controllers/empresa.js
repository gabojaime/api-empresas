'use strict'

const Empresa = require('../models/empresa')

function getEmpresas(req, res) {
    Empresa.find({}, (err, empresas) => {
        if (err) return res.status(500).send({ mensaje: `Error al realizar la peticion: ${err}` })
        if (!empresas) return res.status(404).send({ mensaje: 'No existen empresas' })

        res.status(200).send({ empresas })
    })
}

function getEmpresa(req, res) {
    let empresaId = req.params.empresaId

    Empresa.findById(empresaId, (err, empresa) => {
        if (err) return res.status(500).send({ mensaje: `Error al realizar la peticion: ${err}` })
        if (!empresa) return res.status(404).send({ mensaje: 'La empresa no existe' })

        res.status(200).send({ empresa })
    })
}

function updateEmpresa(req, res) {
    let empresaId = req.params.empresaId
    let update = req.body

    Empresa.findByIdAndUpdate(empresaId, update, (err, empresaUpdated) => {
        if (err) res.status(500).send({ mensaje: `error al actualizar el producto: ${err}` })

        res.status(200).send({ empresa: empresaUpdated })

    })
}

function deleteEmpresa(req, res) {
    let empresaId = req.params.empresaId

    Empresa.findById(empresaId, (err, empresa) => {
        if (err) res.status(500).send({ mensaje: `error al borrar el producto: ${err}` })

        empresa.remove(err => {
            if (err) res.status(500).send({ mensaje: `error al borrar el producto: ${err}` })

            res.status(200).send({ mensaje: 'La empresa ha sido eliminada exitosamente' })
        })
    })
}

function storeEmpresa(req, res) {
    let empresa = new Empresa()

    empresa.razon_social = req.body.razon_social
    empresa.rif = req.body.rif
    empresa.logo = req.body.logo
    empresa.correo = req.body.correo
    empresa.categoria = req.body.categoria
    empresa.descripcion = req.body.descripcion

    empresa.save((err, empresaStored) => {
        if (err) res.status(500).send({ mensaje: `error al guardar ${err}` })

        res.status(200).send({
            mensaje: 'Los datos se han guardado correctamente',
            empresa: empresaStored
        })
    })
}



module.exports = {
    getEmpresas,
    getEmpresa,
    updateEmpresa,
    deleteEmpresa,
    storeEmpresa
}