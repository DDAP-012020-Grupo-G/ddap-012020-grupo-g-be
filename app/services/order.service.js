const Order = require('../models/order.model')
const log4js = require('log4js')
const logger = log4js.getLogger('services')

module.exports = {
  create,
  getAll
}

async function create(orderParam) {
  orderParam.cart.forEach( async (shop) => {
    
    const order = new Order({
      profile_id: orderParam.profile_id,
      shop_id: shop._id,
      price: shop.products.reduce( (partialPrice, product) => {
        return partialPrice + product.totalPrice
      }, 0),
      products: shop.products,
    })

    // save order
    await order.save()
    logger.info(`Profile with id ${order.profile_id} has made an order to shop with id ${shop._id}.`)
  })

  
  return true
}


async function getAll() {

  return await Order.find()
}