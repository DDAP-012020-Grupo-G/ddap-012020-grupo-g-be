const Factory = require('rosie').Factory;
 
const Geo = new Factory()
    .sequence('_id')
    .attrs({
        address: 'Calle falsa 123',
        type: 'CUSTOMER',
        coordinates: [-30, -54]
    })

module.exports = Geo