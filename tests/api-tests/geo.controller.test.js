const request = require('supertest')
const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')

const app = require('../../app/app')

describe('POST /create', () => {
    it('should create a geo', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
				let payload = mockGeo
                
                create(payload, user, (res) => {
                    const body = res.body
                    expect(body).to.be.an('object')
                    expect(body).to.contain.property('address')
                    expect(body).to.contain.property('type')
                    expect(body).to.contain.property('coordinates')
                    done()
                })
            })
        })
    })
    it('should not create a geo if it is invalid', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
				let payload = mockInvalidGeo
                setTimeout(() => {
                    create(payload, user, (res) => {
                        const body = res.body
                        expect(body).to.be.an('object')
                        expect(body).to.contain.property('message')
                        expect(body.message).to.be.equal('Dirección inválida')
                        done()
                    })
                }, 10000)
            })
        })
    })
})

describe('GET /', () => {
    it('should get all geos', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
				let payload = mockGeo
                
                setTimeout(() => {
                    create(payload, user, (res) => {
                        getAll(user, (res) => {
                            const body = res.body
                            expect(body).to.be.an('array')
                            expect(body.length).to.be.equal(1)
                            done()
                        })
                    })
                }, 10000)
            })
        })
    })
})

describe('GET /:geo_id', () => {
    it('should find a geo by id', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
				let payload = mockGeo
                
                setTimeout(() => {
                    create(payload, user, (res) => {
                        let geo = res.body
                        getById(geo, user, (res) => {
                            const body = res.body
                            expect(body).to.be.an('object')
                            expect(body).to.contain.property('_id')
                            expect(body).to.contain.property('address')
                            expect(body).to.contain.property('type')
                            expect(body).to.contain.property('coordinates')
                            done()
                        })
                    })
                }, 10000)
            })
        })
    })
})

function getAll(user, then) {
	request(app)
		.get('/geo/')
        .set('Authorization', `Bearer ${user.token}`)
		.then((res) => then(res))
}

function create(payload, user, then) {
	request(app)
        .post('/geo/create')
        .set('Authorization', `Bearer ${user.token}`)
		.send(payload)
		.then((res) => then(res))
}

function register(payload, then) {
	request(app)
		.post('/users/register')
		.send(payload)
		.then((res) => then(res))
}

function getById(geo, user, then) {
	request(app)
		.get(`/geo/${geo._id}`)
		.set('Authorization', `Bearer ${user.token}`)
		.then((res) => then(res))
}

function authenticate(payload, then) {
	request(app)
		.post('/users/authenticate')
		.send(payload)
		.then((res) => then(res))
}

const mockCustomer = {
	firstName: "Customer",
	lastName: "1",
	email: "customer@gmail.com",
	password: "customer"
}

const mockCustomerAuth = {
	email: "customer@gmail.com",
	password: "customer"
}

const mockGeo = {
    address: 'Rivadavia 50 Quilmes',
    type: 'SHOP'
}

const mockInvalidGeo = {
    address: '??!"#%!"#!"',
    type: 'CUSTOMER'
}