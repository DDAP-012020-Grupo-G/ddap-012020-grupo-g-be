const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const ShopCategory = require('../../app/models/shopCategory.model')

describe('New shop category', () => {
	it('should create a shop category', (done) => {

    const shopCategory = new ShopCategory({
        code: 'FFD',
        name: 'Comida rapida'
    })

    expect(shopCategory.toJSON()).to.be.an('object')

    expect(shopCategory).to.contain.property('_id')
    expect(shopCategory).to.contain.property('name')
    expect(shopCategory).to.contain.property('code')

    expect(shopCategory.name).to.be.equal('Comida rapida')
    expect(shopCategory.code).to.be.equal('FFD')


    done()
    })
})
