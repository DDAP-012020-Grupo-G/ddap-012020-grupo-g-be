const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const ShopCategory = require('../factories/shop.category.factory')

describe('New shop category', () => {
	it('should create a shop category', (done) => {

    const shopCategory = ShopCategory.build()

    expect(shopCategory).to.be.an('object')

    expect(shopCategory).to.contain.property('_id')
    expect(shopCategory).to.contain.property('name')
    expect(shopCategory).to.contain.property('code')

    expect(shopCategory.name).to.be.equal('Comida rapida')
    expect(shopCategory.code).to.be.equal('FFD')


    done()
    })
})