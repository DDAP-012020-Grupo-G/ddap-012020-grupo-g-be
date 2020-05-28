const Factory = require('rosie').Factory;

const ProfileModel = require('../../app/models/profile.model')

const Profile = Factory.define('profile', ProfileModel)
    .sequence('_id')
    .attrs({
        user_id: 1,
        Profile_id: 1,
        firstName: 'Usuario',
        lastName: 'Común',
        picUrl: 'http://url.com/123'
    })

module.exports = Profile