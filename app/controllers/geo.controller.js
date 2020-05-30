const express = require('express')
const router = express.Router()
const geoService = require('../services/geo.service')

// routes
router.get('/:id', getById)
router.post('/create', create)

module.exports = router


function getById(req, res, next) {
  geoService
    .getById(req.params.id)
    .then((geo) => (geo ? res.json(geo) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function create(req, res, next) {
  geoService
    .create(req.body)
    .then((geo) =>
      geo ?
      res.json(geo) :
      res.status(400).json({
        message: 'Geo inválido'
      })
    )
    //.then(() => res.json({ message: 'Comercio registrado correctamente' }))
    .catch((err) => next(err))
}

function update(req, res, next) {
  shopService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: 'Comercio modificado correctamente' }))
    .catch((err) => next(err))
}

function getAll(req, res, next) {
  shopService
    .getAll()
    .then((shops) => res.json(shops))
    .catch((err) => next(err))
}