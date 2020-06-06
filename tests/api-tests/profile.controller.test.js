const request = require('supertest')
const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')

const app = require('../../app/app')

describe('POST /save', () => {
	it('should save a profile from a recent registered user', (done) => {
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

					expect(body).to.be.an('object')
					expect(body).to.contain.property('message')
					expect(body.message).to.be.equal('Perfil modificado correctamente')
					done()
				})
		})
		})
	})
})

// describe('POST /save', () => {
// 	it('should save a profile from a recent registered user', (done) => {
//         payload = mockCustomer
// 		register(payload, (res) => {
//             console.log(res.body)
//             request(app)
//                 .get(`/profiles/${res.body.id}`)
//                 .then((res) => {
//                     const body = res.body

//                     expect(body).to.be.an('object')
//                     expect(body).to.contain.property('user_id')    
//                     done()
//                 })
// 		})
// 	})
// })

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

const mockShop = {
	email: "shop@gmail.com",
	password: "shop"
}