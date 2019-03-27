const morgan = require('morgan')
const fs = require('fs')

module.exports = app => {
  app.use(
    morgan('common', {
      stream: fs.createWriteStream('./app.log', { flags: 'a' }),
    })
  )
}
