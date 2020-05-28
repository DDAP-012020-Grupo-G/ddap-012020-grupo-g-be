const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const ProductCategory = require ('../factories/product.category.factory')
const Shop = require ('../factories/shop.factory')
const Product = require ('../factories/product.factory')
const ShopPromotion = require ('../factories/shop.promotion.factory')

describe('New shop promotion', () => {
	it('should create a shop promotion', (done) => {
    const productCategory = ProductCategory.build()

    const shop = Shop.build()

    const product = Product.build({
        shop_id: shop._id,
        product_category_id: productCategory._id
    })

    const shopPromotion = ShopPromotion.build({
        shop_id: shop._id,
        products:[{
            product_id: product._id,
            quantity: 2
        }]
    })

    expect(shopPromotion).to.be.an('object')

    expect(shopPromotion).to.contain.property('_id')
    expect(shopPromotion).to.contain.property('shop_id')
    expect(shopPromotion).to.contain.property('title')
    expect(shopPromotion).to.contain.property('description')
    expect(shopPromotion).to.contain.property('discount')
    expect(shopPromotion).to.contain.property('validThrough')
    expect(shopPromotion).to.contain.property('product_category_id')
    expect(shopPromotion).to.contain.property('products')

    expect(shopPromotion.shop_id).to.be.equal(shop._id)
    expect(shopPromotion.products[0].product_id).to.be.equal(product._id)
    expect(shopPromotion.products[0].quantity).to.be.equal(2)
    expect(shopPromotion.title).to.be.equal('Promo Cuarentena')
    expect(shopPromotion.description).to.be.equal('Descuentos de cuarentena')
    expect(shopPromotion.discount).to.be.equal(20)

    done()
    })
})
