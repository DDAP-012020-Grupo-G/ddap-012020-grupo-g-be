const Factory = require('rosie').Factory;
const ProductCategoryModel = require('../../app/models/productCategory.model')

const ProductCategory = Factory.define('productCategory', ProductCategoryModel)
    .sequence('_id')
    .attrs({
        code: 'LGM',
        name: 'Legumbres'
    })

module.exports = ProductCategory
