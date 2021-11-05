const cors = require('cors')
const express = require('express')

const errorHandler = require('../middleware/errors.middleware')
const { NotFoundError } = require('../utils/errors.utils')
const requestLogger = require('../middleware/requestLogger.middleware')
const apiRoutes = require('../routes/index')

const server = () => {
    const app = express()

    // middleware
    app.use(express.static('build')) // connect frontend
    app.use(cors())
    app.use(express.json())
    app.use(requestLogger)

    // get routes
    app.use('/api', apiRoutes)

    // Route does not exist
    app.use((req, res, next) => {
        return next(new NotFoundError())
    })

    // Error handler
    app.use(errorHandler)

    return app
}


module.exports = server