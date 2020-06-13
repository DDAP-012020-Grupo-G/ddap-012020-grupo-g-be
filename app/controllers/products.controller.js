const express = require('express')
const router = express.Router()
const productService = require('../services/product.service')

// routes
router.post('/add', add)
router.put('/:product_id', update)
router.get('/', getAll)
router.get('/shop/:shop_id', getByShopId)
// router.get('/profile/:profile_id', getByProfileId)

module.exports = router

function add(req, res, next) {
  productService
    .create(req.body)
    .then((product) =>
    product ?
      res.json({ message: 'Producto creado correctamente' }) :
      res.status(400).json({
        message: 'Producto inválido'
      })
    )
    .catch((err) => next(err))
}

function update(req, res, next) {
  productService
    .update(req.params.product_id, req.body)
    .then(() => res.json({ message: 'Producto modificado correctamente' }))
    .catch((err) => next(err))
}

function getAll(req, res, next) {
  productService
    .getAll()
    .then((products) => res.json(products))
    .catch((err) => next(err))
}

function getByShopId(req, res, next) {
  productService
    .getByShopId(req.params.shop_id, req.body)
    .then((products) => res.json(products))
    .catch((err) => next(err))
}