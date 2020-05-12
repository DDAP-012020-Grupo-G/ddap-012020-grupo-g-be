const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const User = require('../../app/models/user.model')
const Profile = require('../../app/models/profile.model')
const Geo = require('../../app/models/geo.model')
const ProfileSettings = require('../../app/models/profileSettings.model')

describe('New profile settings', () => {
	it('should create profile settings from a user', (done) => {
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

    const profileSettings = new ProfileSettings({
        profile_id: profile._id,
        thresholds: [],
        savedCarts: []
    })

    expect(profileSettings.toJSON()).to.be.an('object')

    expect(profileSettings).to.contain.property('_id')
    expect(profileSettings).to.contain.property('profile_id')
    expect(profileSettings).to.contain.property('thresholds')
    expect(profileSettings).to.contain.property('savedCarts')

    done()
  })
})