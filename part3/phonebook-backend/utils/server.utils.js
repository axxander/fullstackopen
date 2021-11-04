const cors = require('cors')
const express = require('express')
// const morgan = require('morgan');

const errorHandler = require('../middleware/errors.middleware')
const { NotFoundError } = require('../utils/errors.utils')
const routes = require('../routes/routes')

const server = () => {
    const app = express()

    // middleware
    app.use(express.static('build')) // connect frontend
    app.use(cors())
    app.use(express.json())

    // logging
    // morgan.token('body', (req, res) => JSON.stringify(req.body));
    // app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

    // view engine
    app.set('view engine', 'ejs')

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