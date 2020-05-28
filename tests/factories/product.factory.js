const Factory = require('rosie').Factory;

const ProductModel = require('../../app/models/product.model')

const Product = Factory.define('product', ProductModel)
    .sequence('_id')
    .attrs({
        shop_id: 1,
        name: 'porotos',
        brand: 'Marolio',
        stock: 40,
        price: 50,
        picUrl: 'http://marolio.com/porotos',
        product_category_id: 1
    })

module.exports = Product