const mongoose = require('mongoose')

let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/abastify-be'
} else {
  urlDB = process.env.MONGODB_URI
}

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((res, err) => {
        if (err) return reject(err)
        console.log('Database succesfully online')
        resolve()
      })
  })
}

module.exports.close = () => {
  return mongoose.disconnect()
}