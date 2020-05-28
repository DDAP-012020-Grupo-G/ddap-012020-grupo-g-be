const Factory = require('rosie').Factory;

const ShopModel = require('../../app/models/shop.model')

const Shop = Factory.define('shop', ShopModel)
    .sequence('_id')
    .attrs({  
        profile_id: 1,
        name: 'McDonalds',
        phoneNbr: '1134343434',
        email: 'mcdonalds@gmail.com',
        picUrl: 'http://mcdonalds.com/logo',
        Shop_id: 1,
        shop_category_id: 1,
        timeSchedule: [{
            day: 'Lunes a viernes',
            openAt: '9:00 a 21:00'
        }],
        paymentMethods: [{
            type: 'Efectivo'
        }],
        delivery: {
            active: true,
            maxRange: 5
        }
    })

module.exports = Shop