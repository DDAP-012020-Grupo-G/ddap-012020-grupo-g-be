const request = require('supertest')
const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')

const app = require('../../app/app')

describe('PUT /:user_id', () => {
	it('should save a profile from a recent registered user', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
				const user = res.body
				let payload = mockProfile

				update(payload, user, (res) => {
					const body = res.body

					expect(body).to.be.an('object')
					expect(body).to.contain.property('message')
					expect(body.message).to.be.equal('Perfil modificado correctamente')
					done()
				})
			})
		})
	})
})

describe('GET /:user_id', () => {
	it('should get the profile of a user', (done) => {
		const payload = mockCustomer
		register(payload, (res) => {
			
			let payload = mockCustomerAuth

			authenticate(payload, (res) => {
				const user = res.body
				let payload = {
					...mockProfile
				}
				
				update(payload, user, (res) => {
					const body = res.body

					getById(user, (res) => {
						const body = res.body

						expect(body).to.be.an('object')
						expect(body).to.contain.property('firstName')
						expect(body).to.contain.property('lastName')
						done()
					})
				})
			})
		})
	})
})

function update(payload, user, then) {
	request(app)
        .put(`/profiles/${user._id}`)
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

function authenticate(payload, then) {
	request(app)
		.post('/users/authenticate')
		.send(payload)
		.then((res) => then(res))
}

function getById(user, then) {
	request(app)
		.get(`/profiles/${user._id}`)
		.set('Authorization', `Bearer ${user.token}`)
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
	address: "Calle 354 471 Berazategui"
}