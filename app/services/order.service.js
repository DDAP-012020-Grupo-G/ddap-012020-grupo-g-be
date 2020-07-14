const Order = require('../models/order.model')

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
  })

  
  return true
}


async function getAll() {
  return await Order.find()
}