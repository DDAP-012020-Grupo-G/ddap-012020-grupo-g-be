const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')


const User = require('../factories/user.factory')

describe('New user', () => {
	it('should create a user', (done) => {
    
    const user = User.build()

    expect(user).to.be.an('object')
    expect(user).to.contain.property('_id')
    expect(user).to.contain.property('email')
    expect(user).to.contain.property('createdAt')
    expect(user.email).to.be.equal('user@gmail.com')
    done()
  })
})