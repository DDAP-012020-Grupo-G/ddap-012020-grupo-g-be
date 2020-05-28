const Factory = require('rosie').Factory;
 
const Product = new Factory()
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