const Factory = require('rosie').Factory;
const ProfileSettingsModel = require('../../app/models/profileSettings.model')

const ProfileSettings = Factory.define('profileSettings', ProfileSettingsModel)
    .sequence('_id')
    .attrs({
        profile_id: 1,
        thresholds: [],
        savedCarts: []
    })

module.exports = ProfileSettings