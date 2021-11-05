const cors = require('cors')
const express = require('express')
const logger = require('./logger.utils')
const mongoose = require('mongoose')

const errorHandler = require('../middleware/errors.middleware')
const { NotFoundError } = require('../utils/errors.utils')
const routes = require('../routes/index')

const server = () => {
    const app = express()

    // connect to MongoDB
    logger.info('connecting to MongoDB')
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            logger.info('connected to MongoDB')
        })
        .catch(err => {
            logger.error(`error connecting to MongoDB: ${err.message}`)
        })

    // middleware
    app.use(express.static('build')) // connect frontend
    app.use(cors())
    app.use(express.json())

    // get routes
    app.use('/api', routes)

    // Route does not exist
    app.use((req, res, next) => {
        return next(new NotFoundError())
    })

    // Error handler
    app.use(errorHandler)

    return app
}


module.exports = server