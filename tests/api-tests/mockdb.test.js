const { before, after, beforeEach } = require('mocha')
const db = require('../mock-db-helper')

before((done) => db.connect(done))

after((done) => db.close(done))

beforeEach((done) => db.clean(done))