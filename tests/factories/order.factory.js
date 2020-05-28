const Factory = require('rosie').Factory;

const Order = new Factory()
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