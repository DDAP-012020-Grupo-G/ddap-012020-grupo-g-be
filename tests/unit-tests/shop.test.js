const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const User = require('../../app/models/user.model')
const Profile = require('../../app/models/profile.model')
const Geo = require('../../app/models/geo.model')
const Shop = require('../../app/models/shop.model')
const ShopCategory = require('../../app/models/shopCategory.model')

describe('New shop', () => {
	it('should create a shop', (done) => {
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

    expect(shop.toJSON()).to.be.an('object')

    expect(shop).to.contain.property('_id')
    expect(shop).to.contain.property('name')
    expect(shop).to.contain.property('phoneNbr')
    expect(shop).to.contain.property('email')
    expect(shop).to.contain.property('geo_id')
    expect(shop).to.contain.property('picUrl')
    expect(shop).to.contain.property('shop_category_id')
    expect(shop).to.contain.property('timeSchedule')
    expect(shop).to.contain.property('paymentMethods')
    expect(shop).to.contain.property('delivery')


    expect(shop.name).to.be.equal('McDonalds')
    expect(shop.phoneNbr).to.be.equal(1134343434)
    expect(shop.email).to.be.equal('mcdonalds@gmail.com')
    expect(shop.geo_id).to.be.equal(shopGeo._id)
    expect(shop.picUrl).to.be.equal('http://mcdonalds.com/logo')
    // expect(shop.shop_category_id).to.be.equal(shopCategory._id)
    // expect(shop.timeSchedule.day).to.be.equal('Lunes a viernes')
    // expect(shop.timeSchedule.openAt).to.be.equal('9:00 a 21:00')
    // expect(shop.delivery.active).to.be.true
    done()
    })
})
