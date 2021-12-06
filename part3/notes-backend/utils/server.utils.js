const cors = require('cors')
const express = require('express')

const connect = require('../db/connect.db')
const errorHandler = require('../middleware/errors.middleware')
const { NotFoundError } = require('./errors.utils')
const requestLogger = require('../middleware/requestLogger.middleware')
const apiRoutes = require('../routes/index')
const { deserializeUser } = require('../middleware/sessions.middleware')

const server = () => {
    connect()

    const app = express()

    // middleware
    app.use(express.static('build')) // connect frontend
    app.use(cors())
    app.use(express.json())
    app.use(requestLogger)
    app.use(deserializeUser)

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