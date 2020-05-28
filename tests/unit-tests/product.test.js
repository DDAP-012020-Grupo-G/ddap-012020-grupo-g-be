const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')


const Shop = require('../factories/shop.factory')
const Product = require('../factories/product.factory')
const ProductCategory = require('../factories/product.category.factory')

describe('New product', () => {
    it('should create a product', (done) => {
        const productCategory = ProductCategory.build()

        const shop = Shop.build()

        const product = Product.build({
            shop_id: shop._id,
            product_category_id: productCategory._id
        })

        expect(product).to.be.an('object')

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

        expect(product.shop_id).to.be.equal(shop._id)
        expect(product.product_category_id).to.be.equal(productCategory._id)

        done()
    })
})