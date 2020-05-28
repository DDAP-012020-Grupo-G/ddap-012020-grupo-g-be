const request = require('supertest')
const { expect } = require('chai')
const { before, after, describe, it, equal, to } = require('mocha')
const db = require('../mock-db-helper')

const app = require('../../app/app')

before((done) => db.connect(done))

after((done) => db.close(done))

beforeEach((done) => db.clean(done))

// describe('POST /save', () => {
// 	it('should save a profile from a recent registered user', (done) => {
//         payload = mockCustomer
// 		register(payload, (res) => {
// 			let payload = {
// 				username: "customer",
// 				password: "customer"
// 			}

// 			authenticate(payload, (res) => {
// 				const body = res.body
//                 let payload = {
//                     ...mockProfile,
//                     token : body.token
//                 }

//                 save(payload, (res) => {
//                     const body = res.body
        
//                     expect(body).to.be.an('object')
//                     expect(body).to.contain.property('message')
//                     expect(body.message).to.be.equal('Perfil guardado correctamente')
//                     done()
//                 })
//             })
// 		})
// 	})
// })

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

function save(payload, then) {
	request(app)
        .post('/profiles/save')
        .set('Authorization', `Bearer ${token}`)
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
	email: "customer@gmail.com",
	password: "customer"
}

const mockProfile = {
	firstName: "octavio",
	lastName: "gonzalez",
	address: "address",
}

const mockShop = {
	email: "shop@gmail.com",
	password: "shop"
}