const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')

const User = require('../factories/user.factory')
const Profile = require('../factories/profile.factory')
const Geo = require('../factories/geo.factory')

describe('New profile', () => {
	it('should create a profile', (done) => {
    const user = User.build()
    const geo = Geo.build()
    const profile = Profile.build({
      user_id: user._id,
      geo_id: geo._id
    })
   
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