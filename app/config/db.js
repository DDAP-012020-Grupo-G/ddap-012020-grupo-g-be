const mongoose = require('mongoose')

let urlDB = 'mongodb://localhost:27017/realml-be'

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/realml-be'
} else {
  urlDB =
    'here write the mongo connection with mongo atlas and other type of connection mode'
}

process.env.DB_URI = urlDB

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_URI, {
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
