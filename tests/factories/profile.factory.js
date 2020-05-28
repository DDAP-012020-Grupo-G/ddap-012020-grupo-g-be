const Factory = require('rosie').Factory;

const Profile = new Factory()
    .sequence('_id')
    .attrs({
        user_id: 1,
        geo_id: 1,
        firstName: 'Usuario',
        lastName: 'Común',
        picUrl: 'http://url.com/123'
    })

module.exports = Profile