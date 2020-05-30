const express = require('express')
const router = express.Router()
const shopService = require('../services/shop.service')

// routes
router.post('/add', add)
router.get('/', getAll)
router.get('/profile/:id', getByProfileId)
router.put('/profile/:id', update)

module.exports = router

function getByProfileId(req, res, next) {
  shopService
    .getByProfileId(req.params.id)
    .then((shop) => (shop ? res.json(shop) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function add(req, res, next) {
  shopService
    .create(req.body)
    .then((shop) =>
      shop ?
      res.json(shop) :
      res.status(400).json({
        message: 'Comercio inválido'
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