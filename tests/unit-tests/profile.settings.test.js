const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const Profile = require('../factories/profile.factory')

const ProfileSettings = require('../factories/profile.settings.factory')

describe('New profile settings', () => {
	it('should create profile settings from a user', (done) => {
    const profile = Profile.build()

    const profileSettings = ProfileSettings.build({
      profile_id: profile._id
    })

    expect(profileSettings).to.be.an('object')

    expect(profileSettings).to.contain.property('_id')
    expect(profileSettings).to.contain.property('profile_id')
    expect(profileSettings).to.contain.property('thresholds')
    expect(profileSettings).to.contain.property('savedCarts')
    expect(profileSettings).to.contain.property('asdasd')
    done()
  })
})