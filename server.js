require('rootpath')();
const app = require('app/app')
const db = require('app/config/db')

process.env.PORT = process.env.PORT || 4000

// start server
db.connect()
  .then(() => {
    app.listen(process.env.PORT , function () {
      console.log('Server listening on port ' + process.env.PORT)
    })
  })
