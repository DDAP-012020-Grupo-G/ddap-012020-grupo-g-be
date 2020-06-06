const request = require('supertest')
const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')

const app = require('../../app/app')

describe('GET /', () => {
    it('should get all shops', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
				let payload = mockShopProfile
                
                add(payload, user, (res) => {
                    getAll((res) => {
                        const body = res.body
                        expect(body).to.be.an('array')
                        expect(body.length).to.be.equal(1)
                        done()
                    })
                })
            })
        })
    })
})

describe('GET /profile/:profile_id', () => {
    it('should get a shop by profile id', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body 
                getProfileByUserId(user, (res) => {
                    let profile = res.body
                    let payload = {
                        ...mockShopProfile,
                        profile_id: profile._id
                    }
                    add(payload, user, (res) => {
                        getShopByProfileId(profile, user, (res) => {
                            const body = res.body
                            expect(body).to.be.an('object')
                            expect(body).to.contain.property('_id')
                            expect(body).to.contain.property('name')
                            expect(body).to.contain.property('address')
                            expect(body).to.contain.property('timeSchedule')
                            expect(body).to.contain.property('paymentMethods')
                            expect(body).to.contain.property('phoneNbr')
                            expect(body).to.contain.property('picUrl')
                            expect(body).to.contain.property('delivery')
                            expect(body).to.contain.property('profile_id')
                            expect(body).to.contain.property('email')
                            done()
                        })
                    })
                })
            })
        })
    })
})

describe('POST /add', () => {
    it('should create a shop', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
                getProfileByUserId(user, (res) => {
                    let profile = res.body
                    let payload = {
                        ...mockShopProfile,
                        profile_id: profile._id
                    }
                    add(payload, user, (res) => {           
                        const body = res.body
                        expect(body).to.be.an('object')
                        expect(body).to.have.property('message')
                        expect(body.message).to.be.equal('Comercio creado correctamente')
                        done()
                    })
                })
            })
        })
    })
})

describe('PUT /profile/:id', () => {
	it('should modify a shop', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
                getProfileByUserId(user, (res) => {
                    let profile = res.body
                    let payload = {
                        ...mockShopProfile,
                        profile_id: profile._id
                    }
                    add(payload, user, (res) => {
                        let payload = mockShopUpdated
                        getShopByProfileId(profile, user, (res) => {
                            let shop = res.body
                            update(payload, user, shop, (res) => {
                                const body = res.body
                                expect(body).to.be.an('object')
                                expect(body).to.have.property('message')
                                expect(body.message).to.be.equal('Comercio modificado correctamente')
                                done()
                            })
                        })
                    })
				})
			})
		})
    })
    it('should not modify an invalid shop', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
                let user = res.body
                getProfileByUserId(user, (res) => {
                    let profile = res.body
                    let payload = {
                        ...mockShopProfile,
                        profile_id: profile._id
                    }
                    add(payload, user, (res) => {
                        let invalidShop = {
                            _id: user._id,
                        }
                        update(payload, user, invalidShop, (res) => {
                            const body = res.body
                            expect(body).to.be.an('object')
                            expect(body).to.have.property('message')
                            expect(body.message).to.be.equal('Comercio no encontrado')
                            done()
                        })
                    })
				})
			})
		})
    })
})

function getAll(then) {
	request(app)
		.get('/shops/')
		.then((res) => then(res))
}

function add(payload, user, then) {
	request(app)
        .post('/shops/add')
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

function getProfileByUserId(user, then) {
	request(app)
		.get(`/profiles/${user._id}`)
		.set('Authorization', `Bearer ${user.token}`)
		.then((res) => then(res))
}

function getShopByProfileId(profile, user, then) {
	request(app)
		.get(`/shops/profile/${profile._id}`)
		.set('Authorization', `Bearer ${user.token}`)
		.then((res) => then(res))
}

function update(payload, user, shop, then) {
	request(app)
        .put(`/shops/profile/${shop._id}`)
        .set('Authorization', `Bearer ${user.token}`)
		.send(payload)
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

const mockProfile = {
	firstName: "Octavio",
	lastName: "Gonzalez",
	address: "Mitre 914",
}

const mockShopUser = {
	email: "shop@gmail.com",
	password: "shop"
}

const mockShopProfile = {
    profile_id: null,
    name: 'McDonalds',
    phoneNbr: '1134343434',
    address: 'Mitre 1231',
    email: 'mcdonalds@gmail.com',
    picUrl: 'http://mcdonalds.com/logo',
    timeSchedule: [{
        day: 'Lunes a viernes',
        openAt: '9:00 a 21:00'
    }],
    paymentMethods: [{
        type: 'Efectivo'
    }],
    delivery: {
        active: true,
        maxRange: 5
    }
}

const mockShopUpdated = {
    address: 'Rivadavia 50'
}