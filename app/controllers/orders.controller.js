const express = require('express')
const router = express.Router()
const orderService = require('../services/order.service')

// routes
router.post('/add', add)
router.get('/', getAll)
// router.post('/user/:user_id', getMyOrders)
// router.post('/shop/:shop_id', getMyShopOrders)

module.exports = router

function add(req, res, next) {
  orderService
    .create(req.body)
    .then((order) =>
    order ?
      res.json({ message: 'Pedido creado correctamente' }) :
      res.status(400).json({
        message: 'Pedido inválido'
      })
    )
    .catch((err) => next(err))
}


function getAll(req, res, next) {
  orderService
    .getAll()
    .then((orders) => res.json(orders))
    .catch((err) => next(err))
}