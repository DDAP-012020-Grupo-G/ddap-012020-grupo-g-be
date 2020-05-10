const {
	MongoMemoryServer
} = require('mongodb-memory-server')
const mongoose = require('mongoose')

process.env.NODE_ENV = 'test'

let mongoServer

function connect(done) {
	mongoServer = new MongoMemoryServer();
	mongoServer.getUri()
		.then((mongoUri) => {
			mongoose.connect(mongoUri, {
					useCreateIndex: true,
					useNewUrlParser: true,
					useUnifiedTopology: true
				})
				.then((res, err) => {
					if (err) {
						console.log("Mock-Database succesfully online \n")
						return
					}
					console.log("Mock-Database succesfully online \n")
					done()
				})
		});
}

function close(done) {
	mongoose.disconnect()
		.then(() => mongoServer.stop()
			.then(() => done()))
}

function clean(done) {
	for (var collection in mongoose.connection.collections) {
		mongoose.connection.collections[collection].deleteMany({});
	}

	done()
}

module.exports = {
	connect,
	close,
	clean
}