const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const Profile = require('../factories/profile.factory')
const Shop = require('../factories/shop.factory')
const Product = require('../factories/product.factory')
const Order = require('../factories/order.factory')

describe('New order', () => {
    it('should create an order', (done) => {
        const profile = Profile.build()

        const shop = Shop.build({
            profile_id: profile._id
        })

        const product = Product.build({
            shop_id: shop._id,
        })

        const order = Order.build({
            profile_id: profile._id,
            shop_id: shop._id,
            products: [{
                product_id: product._id,
                quantity: 5
            }]
        })

        expect(order).to.be.an('object')

        expect(order).to.contain.property('_id')
        expect(order).to.contain.property('profile_id')
        expect(order).to.contain.property('shop_id')
        expect(order).to.contain.property('products')
        expect(order).to.contain.property('price')

        done()
    })
})