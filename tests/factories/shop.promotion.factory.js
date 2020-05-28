const Factory = require('rosie').Factory;
const ShopPromotionModel = require('../../app/models/shopPromotion.model')

const ShopPromotion = Factory.define('shopPromotion', ShopPromotionModel)
    .sequence('_id')
    .attrs({
        shop_id: 1,
        title: 'Promo Cuarentena',
        description: 'Descuentos de cuarentena',
        discount: 20,
        validThrough: {
            from: '07/05/2020',
            to: '10/05/2020'
        },
        product_category_id: 1,
        products: [{
            product_id: 1,
            quantity: 2
        },
        {
            product_id: 5,
            quantity: 3
        }]
    })



module.exports = ShopPromotion