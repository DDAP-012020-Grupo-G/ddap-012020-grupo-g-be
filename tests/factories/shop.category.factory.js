const Factory = require('rosie').Factory;
 
const ShopCategory = new Factory()
    .sequence('_id')
    .attrs({
        code: 'FFD',
        name: 'Comida rapida'
    })

module.exports = ShopCategory