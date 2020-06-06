const request = require('supertest')
const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')

const app = require('../../app/app')

describe('POST /register', () => {
	it('should register a user', (done) => {
		let payload = mockAdmin

		register(payload, (res) => {
			const body = res.body

			expect(body).to.be.an('object')
			// expect(body).to.contain.property('message')
			// expect(body.message).to.be.equal('Usuario registrado correctamente')
			done()
		})
	})

	it('should fail when register the same user twice', (done) => {
		let payload = mockAdmin

		register(payload, (res) => {
			const body = res.body

			expect(body).to.be.an('object')
			
			register(payload, (res) => {
				const body = res.body
				const status = res.status

				expect(status).to.be.equal(400)	
				expect(body).to.be.an('object')
				expect(body).to.contain.property('message')
				expect(body.message).to.be.equal('El email [admin@gmail.com] ya existe')
				done()
			})
		})
	})
})

describe('POST /authenticate', () => {
	it('should authenticate the user', (done) => {
		payload = mockAdmin
		register(payload, (res) => {
			const body = res.body

			expect(body).to.be.an('object')
			
			let payload = {
				email: "admin@gmail.com",
				password: "admin"
			}

			authenticate(payload, (res) => {
				const body = res.body

				expect(body).to.be.an('object')
				expect(body).to.contain.property('_id')
				expect(body).to.contain.property('email')
				expect(body).to.contain.property('createdAt')
				expect(body).to.contain.property('__v')
				expect(body).to.contain.property('token')

				done()
			})
		})
	})
	it('should throw an error when trying to auth with incorrect data', (done) => {
		payload = mockAdmin
		register(payload, (res) => {
			const body = res.body

			expect(body).to.be.an('object')
			
			let payload = {
				email: "admin@gmail.com",
				password: ""
			}
			
			authenticate(payload, (res) => {
				const body = res.body
				expect(body).to.be.an('object')
				expect(body).to.contain.property('message')
				expect(body.message).to.equal('Email o contraseña inválido')
				done()
			})
		})
	})
	it('should throw an error when invalid payload', (done) => {
		payload = mockAdmin
		register(payload, (res) => {
			const body = res.body

			expect(body).to.be.an('object')
			
			let payload = {
				email: "admin@gmail.com"
			}
			
			authenticate(payload, (res) => {
				const body = res.body
				expect(body).to.be.an('object')
				expect(body).to.contain.property('message')
				expect(body.message).to.equal('Illegal arguments: undefined, string')
				done()
			})
		})
	})
})

describe('GET /current', () => {
	it('should get the current user with that token', (done) => {

		register(mockAdmin, (res) => {
			authenticate({ email: "admin@gmail.com", password: "admin" }, (res) => {
				const loggedInUser = res.body

				request(app).get('/users/current/')
					.set('Authorization', `Bearer ${loggedInUser.token}`)
					.then((res) => {
						const body = res.body

						expect(body).to.be.an('object')
						done()
					})
					.catch((err) => done(err))
			})
		})
	})

	it('should fail when get the current user with invalid token', (done) => {

		request(app).get('/users/current/')
			.set('Authorization', `Bearer 1234`)
			.then((res) => {
				const body = res.body

				expect(body.message).to.be.equal('Token inválido')
				done()
			})
			.catch((err) => done(err))
		
	})
})

describe('GET /', () => {
	it('should get all users', (done) => {
		
		let payload = mockAdmin

		register(payload, (res) => {
			
			let anotherPayload = mockShop

			register(anotherPayload, (res) => {

				let loggedInAdminUser, 
					loginPayload = {
						email: "admin@gmail.com",
						password: "admin"
					}

				authenticate(loginPayload, (res) => {
					const body = res.body
					loggedInAdminUser = body

					request(app)
						.get('/users/')
						.set('Authorization', `Bearer ${loggedInAdminUser.token}`)
						.then((res) => {
							const body = res.body
							
							expect(body).to.be.an('array')
							expect(body.length).to.be.equal(2)
							done()
						})
						.catch((err) => done(err))

				})
			})
		})
	})
})

describe('GET /:id', () => {
	it('should get the user with that id', (done) => {
		
		let payload = mockAdmin

		register(payload, (res) => {

			let loggedInAdminUser, 
				loginPayload = {
					email: "admin@gmail.com",
					password: "admin"
				}


			authenticate(loginPayload, (res) => {
				const body = res.body
				loggedInAdminUser = body

				request(app)
					.get(`/users/${loggedInAdminUser._id}`)
					.set('Authorization', `Bearer ${loggedInAdminUser.token}`)
					.then((res) => {
						const body = res.body

						expect(body).to.be.an('object')
						expect(body._id).to.be.equal(loggedInAdminUser._id)
						done()
					})
					.catch((err) => done(err))

			})
		})
	})
})

describe('PUT /:id', () => {
	it('should update the user with that id', (done) => {
		
		let payload = mockAdmin

		register(payload, (res) => {

			let loggedInAdminUser

			authenticate({ email: "admin@gmail.com", password: "admin" }, (res) => {
				const body = res.body
				loggedInAdminUser = body

				request(app)
					.put(`/users/${loggedInAdminUser._id}`)
					.set('Authorization', `Bearer ${loggedInAdminUser.token}`)
					.send({ ...loggedInAdminUser, email: 'admin@gmail.com' })
					.then((res) => {
						const body = res.body

						expect(body).to.be.an('object')
						expect(body).to.contain.property('message')
						expect(body.message).to.be.equal('Usuario modificado correctamente')

						authenticate({ email: 'admin@gmail.com', password: 'admin'}, (res) => {
							const body = res.body
							reloggedInAdminUser = body
							
							expect(body).to.be.an('object')
							expect(loggedInAdminUser._id).to.be.equal(reloggedInAdminUser._id)
							expect(reloggedInAdminUser.email).to.be.equal('admin@gmail.com')
							done()			
						})
					})
			})
		})
	})
})


describe('DELETE /:id', () => {
	it('should delete the user with that id', (done) => {
		
		let payload = mockAdmin

		register(payload, (res) => {

			let loggedInAdminUser

			authenticate({ email: "admin@gmail.com", password: "admin" }, (res) => {
				const body = res.body
				loggedInAdminUser = body

				request(app)
					.delete(`/users/${loggedInAdminUser._id}`)
					.set('Authorization', `Bearer ${loggedInAdminUser.token}`)
					.then((res) => {
						const body = res.body

						expect(body).to.be.an('object')
						expect(body).to.contain.property('message')
						expect(body.message).to.be.equal('Usuario eliminado correctamente')

						authenticate({ email: 'admin@gmail.com', password: 'admin'}, (res) => {
							const body = res.body
							reloggedInAdminUser = body
							
							expect(body).to.be.an('object')
							expect(body.message).to.be.equal('Email o contraseña inválido')
							done()			
						})
					})
			})
		})
	})
})


function register(payload, then) {
	request(app)
		.post('/users/register')
		.send(payload)
		.then((res) => then(res))
}

function authenticate(payload, then, onFail= () => {}) {
	request(app)
		.post('/users/authenticate')
		.send(payload)
		.then((res) => then(res))
		.catch((err) => onFail(err))
}

const mockAdmin = {
	email: "admin@gmail.com",
	password: "admin"
}

const mockShop = {
	email: "shop@gmail.com",
	password: "shop"
}

const mockCustomer = {
	email: "customer@gmail.com",
	password: "customer"
}