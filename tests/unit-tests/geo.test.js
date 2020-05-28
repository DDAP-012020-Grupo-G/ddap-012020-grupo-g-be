const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')

const Geo = require('../factories/geo.factory')

describe('New geo', () => {
  it('should create a geo', (done) => {
    const geo = Geo.build()

    expect(geo).to.be.an('object')
    expect(geo).to.contain.property('_id')
    expect(geo).to.contain.property('address')
    expect(geo).to.contain.property('type')
    expect(geo).to.contain.property('coordinates')

    expect(geo.address).to.be.equal('Calle falsa 123')
    expect(geo.type).to.be.equal('CUSTOMER')
    expect(geo.coordinates[0]).to.be.equal(-30)
    expect(geo.coordinates[1]).to.be.equal(-54)
    done()
  })
})