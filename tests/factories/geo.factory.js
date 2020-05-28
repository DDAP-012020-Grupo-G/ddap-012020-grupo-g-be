const Factory = require('rosie').Factory;

const GeoModel = require('../../app/models/geo.model')

const Geo = Factory.define('geo', GeoModel)
    .sequence('_id')
    .attrs({
        address: 'Calle falsa 123',
        type: 'CUSTOMER',
        coordinates: [-30, -54]
    })

module.exports = Geo