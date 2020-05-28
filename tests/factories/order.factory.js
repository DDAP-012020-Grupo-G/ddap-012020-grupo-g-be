const Factory = require('rosie').Factory;

const OrderModel = require('../../app/models/order.model')

const Order = Factory.define('order', OrderModel)
    .sequence('_id')
    .attrs({
        profile_id: 1,
        cart: [{
            product_id: 1,
            quantity: 5
        }],
        price: 250
    })

module.exports = Order