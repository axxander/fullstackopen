const mongoose = require('mongoose')

const logger = require('../utils/logger.utils')

const connect = () => {
    logger.info('connecting to MongoDB')
    return mongoose.
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            logger.info('connected to MongoDB')
        })
        .catch(err => {
            logger.error(`error connecting to MongoDB: ${err.message}`)
            process.exit(1)
        })
}


module.exports = connect