const express = require('express')
const router = express.Router()
const shopService = require('../services/shop.service')

// routes
router.post('/add', add)
router.get('/', getAll)

module.exports = router

function add(req, res, next) {
  shopService
    .create(req.body)
    .then((shop) =>
      shop ?
      res.json(shop) :
      res.status(400).json({
        message: 'Comercio o contraseña inválido'
      })
    )
    //.then(() => res.json({ message: 'Comercio registrado correctamente' }))
    .catch((err) => next(err))
}

function getAll(req, res, next) {
  shopService
    .getAll()
    .then((shops) => res.json(shops))
    .catch((err) => next(err))
}