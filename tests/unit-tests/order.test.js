const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const User = require('../../app/models/user.model')
const Profile = require('../../app/models/profile.model')
const Geo = require('../../app/models/geo.model')
const Shop = require('../../app/models/shop.model')
const ShopCategory = require('../../app/models/shopCategory.model')
const Product = require('../../app/models/product.model')
const ProductCategory = require('../../app/models/productCategory.model')
const Order = require('../../app/models/order.model')

describe('New order', () => {
    it('should create an order', (done) => {
        const user = new User({
            email: "user@gmail.com",
            password: "asdasd"
        })

        const geo = new Geo({
            address: 'Calle falsa 123',
            type: 'CUSTOMER',
            coordinates: [-30, -54]
        })

        const shopGeo = new Geo({
            address: 'Mitre 100',
            type: 'SHOP',
            coordinates: [50, 42]
        })

        const shopCategory = new ShopCategory({
            code: 'FFD',
            name: 'Comida rapida'
        })

        const productCategory = new ProductCategory({
            code: 'LGM',
            name: 'Legumbres'
        })

        const profile = new Profile({
            user_id: user._id,
            geo_id: geo._id,
            firstName: 'Usuario',
            lastName: 'Común',
            picUrl: 'http://url.com/123'
        })

        const shop = new Shop({
            profile_id: profile._id,
            name: 'Maxiconsumo',
            phoneNbr: '1134343434',
            email: 'maxiconsumo@gmail.com',
            picUrl: 'http://maxiconsumo.com/logo',
            geo_id: shopGeo._id,
            shop_category_id: shopCategory._id,
            timeSchedule: {
                day: 'Lunes a viernes',
                openAt: '9:00 a 21:00'
            },
            paymentMethods: {
                type: 'Efectivo'
            },
            delivery: {
                active: true,
                maxRange: 5
            }
        })

        const product = new Product({
            shop_id: shop._id,
            name: 'porotos',
            brand: 'Marolio',
            stock: 40,
            price: 50,
            picUrl: 'http://marolio.com/porotos',
            product_category_id: productCategory._id
        })

        const order = new Order({
            profile_id: profile._id,
            cart: {
                product_id: product._id,
                quantity: 5
            },
            price: 250
        })

    expect(order.toJSON()).to.be.an('object')

    expect(order).to.contain.property('_id')
    expect(order).to.contain.property('profile_id')
    expect(order).to.contain.property('cart')
    expect(order).to.contain.property('price')

    done()
    })
})