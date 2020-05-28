const Factory = require('rosie').Factory;
const ShopCategoryModel = require('../../app/models/shopCategory.model')

const ShopCategory = Factory.define('shopCategory', ShopCategoryModel)
    .sequence('_id')
    .attrs({
        code: 'FFD',
        name: 'Comida rapida'
    })

module.exports = ShopCategory