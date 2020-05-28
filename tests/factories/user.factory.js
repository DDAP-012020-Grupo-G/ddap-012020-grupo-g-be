const Factory = require('rosie').Factory;
const UserModel = require('../../app/models/user.model')

const User = Factory.define('user', UserModel)
    .sequence('_id')
    .attrs({
        email: 'user@gmail.com',
        password: "asdasd",
        createdAt: new Date()
    })

module.exports = User