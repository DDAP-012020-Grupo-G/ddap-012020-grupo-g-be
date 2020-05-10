const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const User = require('../../app/models/user.model')
const Profile = require('../../app/models/profile.model')
const Geo = require('../../app/models/geo.model')
const Shop = require('../../app/models/shop.model')
const ShopCategory = require('../../app/models/shopCategory.model')
const Product = require('../../app/models/product.model')
const ProductCategory = require('../../app/models/productCategory.model')

describe('New product', () => {
	it('should create a product', (done) => {
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
        name: 'McDonalds',
        phoneNbr: 1134343434,
        email: 'mcdonalds@gmail.com',
        picUrl: 'http://mcdonalds.com/logo',
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

    expect(product.toJSON()).to.be.an('object')

    expect(product).to.contain.property('_id')
    expect(product).to.contain.property('name')
    expect(product).to.contain.property('brand')
    expect(product).to.contain.property('stock')
    expect(product).to.contain.property('price')
    expect(product).to.contain.property('picUrl')
    expect(product).to.contain.property('product_category_id')

    expect(product.name).to.be.equal('porotos')
    expect(product.brand).to.be.equal('Marolio')
    expect(product.stock).to.be.equal(40)
    expect(product.price).to.be.equal(50)
    expect(product.picUrl).to.be.equal('http://marolio.com/porotos')

    done()
    })
})
