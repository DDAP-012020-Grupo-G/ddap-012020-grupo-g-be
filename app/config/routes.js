module.exports = configureRoutes
function configureRoutes(app) {
  app.use('/users', require('../controllers/users.controller'))
  app.use('/profiles', require('../controllers/profiles.controller'))
  app.use('/shops', require('../controllers/shops.controller'))
  app.use('/geo', require('../controllers/geo.controller'))
}
