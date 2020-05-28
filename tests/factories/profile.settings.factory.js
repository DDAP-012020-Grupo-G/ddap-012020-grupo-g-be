const Factory = require('rosie').Factory;

const ProfileSettings = new Factory()
    .sequence('_id')
    .attrs({
        profile_id: 1,
        thresholds: [],
        savedCarts: []
    })

module.exports = ProfileSettings