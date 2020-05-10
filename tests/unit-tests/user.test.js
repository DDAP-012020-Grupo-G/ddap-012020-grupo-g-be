const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')

const User = require('../../app/models/user.model')

describe('New user', () => {
	it('should create a user', (done) => {
    const user = new User({
      email: "user@gmail.com",
      password: "asdasd"
    })

    expect(user.toJSON()).to.be.an('object')
    expect(user).to.contain.property('_id')
    expect(user).to.contain.property('email')
    expect(user).to.contain.property('createdAt')
    expect(user.email).to.be.equal('user@gmail.com')
    done()
  })
})