const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')
const User = require ('../../app/models/user.model')
const ShopCategory = require('../../app/models/shopCategory.model')
const Geo = require ('../../app/models/geo.model')
const ProductCategory = require ('../../app/models/productCategory.model')
const Profile = require ('../../app/models/profile.model')
const Shop = require ('../../app/models/shop.model')
const Product = require ('../../app/models/product.model')
const ShopPromotion = require ('../../app/models/shopPromotion.model')

describe('New shop promotion', () => {
	it('should create a shop promotion', (done) => {
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

    const shopPromotion = new ShopPromotion({
        shop_id: shop._id,
        title: 'Promo Cuarentena',
        description: 'Descuentos de cuarentena',
        discount: 20,
        validThrough: {
            from: '07/05/2020',
            to: '10/05/2020'
        },
        product_category_id: productCategory._id,
        products: {
            product_id: product._id,
            quantity: 2
        }
    })

    expect(shopPromotion.toJSON()).to.be.an('object')

    expect(shopPromotion).to.contain.property('_id')
    expect(shopPromotion).to.contain.property('shop_id')
    expect(shopPromotion).to.contain.property('title')
    expect(shopPromotion).to.contain.property('description')
    expect(shopPromotion).to.contain.property('discount')
    expect(shopPromotion).to.contain.property('validThrough')
    expect(shopPromotion).to.contain.property('product_category_id')
    expect(shopPromotion).to.contain.property('products')

    expect(shopPromotion.shop_id).to.be.equal(shop._id)
    expect(shopPromotion.title).to.be.equal('Promo Cuarentena')
    expect(shopPromotion.description).to.be.equal('Descuentos de cuarentena')
    expect(shopPromotion.discount).to.be.equal(20)

    done()
    })
})
