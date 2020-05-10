const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const User = require('../../app/models/user.model')
const Profile = require('../../app/models/profile.model')
const Geo = require('../../app/models/geo.model')

describe('New profile', () => {
	it('should create a profile', (done) => {
    const user = new User({
      email: "user@gmail.com",
      password: "asdasd"
    })

    const geo = new Geo({
      address: 'Calle falsa 123',
      type: 'CUSTOMER',
      coordinates: [-30, -54]
    })

    const profile = new Profile({
      user_id: user._id,
      geo_id: geo._id,
      firstName: 'Usuario',
      lastName: 'Común',
      picUrl: 'http://url.com/123'
    })

    expect(profile).to.be.an('object')

    expect(profile).to.contain.property('_id')
    expect(profile).to.contain.property('user_id')
    expect(profile).to.contain.property('geo_id')
    expect(profile).to.contain.property('firstName')
    expect(profile).to.contain.property('lastName')
    expect(profile).to.contain.property('picUrl')

    expect(profile.user_id).to.be.equal(user._id)
    expect(profile.geo_id).to.be.equal(geo._id)
    expect(profile.firstName).to.be.equal('Usuario')
    expect(profile.lastName).to.be.equal('Común')
    expect(profile.picUrl).to.be.equal('http://url.com/123')

    done()
  })
})