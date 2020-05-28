const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const Profile = require('../factories/profile.factory')
const Geo = require('../factories/geo.factory')
const Shop = require('../factories/shop.factory')
const ShopCategory = require('../factories/shop.category.factory')

describe('New shop', () => {
	it('should create a shop', (done) => {
    
    const shopGeo = Geo.build()

    const shopCategory = ShopCategory.build()

    const profile = Profile.build()

    const shop = Shop.build({
        shop_category_id: shopCategory._id,
        geo_id: shopGeo._id,
        profile_id: profile._id
    })

    expect(shop).to.be.an('object')

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
    expect(shop.phoneNbr).to.be.equal('1134343434')
    expect(shop.email).to.be.equal('mcdonalds@gmail.com')
    expect(shop.geo_id).to.be.equal(shopGeo._id)
    expect(shop.picUrl).to.be.equal('http://mcdonalds.com/logo')
    expect(shop.shop_category_id).to.be.equal(shopCategory._id)
    expect(shop.timeSchedule.day).to.be.equal('Lunes a viernes')
    expect(shop.timeSchedule.openAt).to.be.equal('9:00 a 21:00')
    expect(shop.delivery.active).to.be.true
    done()
    })
})
