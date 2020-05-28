const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const ProductCategory = require('../factories/product.category.factory')

describe('New product category', () => {
	it('should create a product category', (done) => {

    const productCategory = ProductCategory.build()

    expect(productCategory).to.be.an('object')

    expect(productCategory).to.contain.property('_id')
    expect(productCategory).to.contain.property('name')
    expect(productCategory).to.contain.property('code')

    expect(productCategory.code).to.be.equal('LGM')
    expect(productCategory.name).to.be.equal('Legumbres')

    done()
    })
})
