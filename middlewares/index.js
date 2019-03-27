const logger = require('./logger')
const errorHandler = require('./errors')

module.exports = app => {
  app.use(errorHandler)
  // Default 404 error handler
  app.use((req, res, next) => {
    res.status(404).send('Route not found')
  })
  logger(app)
}
