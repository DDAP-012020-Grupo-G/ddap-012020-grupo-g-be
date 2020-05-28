const Factory = require('rosie').Factory;
 
const ProductCategory = new Factory()
    .sequence('_id')
    .attrs({
        code: 'LGM',
        name: 'Legumbres'
    })

module.exports = ProductCategory
