const errorHandler = require('./utils/error-handler')
const configureRoutes = require('./config/routes')
const bodyParser = require('body-parser')
const jwt = require('./utils/jwt')
const cors = require('cors')
const path = require('path')

const express = require('express')
const app = express()

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// render site html
let renderHTML = path.resolve('public/index.html')
app.get('/', function (req, res) {
  res.sendFile(renderHTML)
})

// use JWT auth to secure the api
app.use(jwt())

// api routes
configureRoutes(app)

// global error handler
app.use(errorHandler)

module.exports = app
