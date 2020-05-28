const Factory = require('rosie').Factory;
 
const User = new Factory()
    .sequence('_id')
    .attrs({
        email: 'user@gmail.com',
        password: "asdasd",
        createdAt: new Date()
    })

module.exports = User