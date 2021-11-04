const express = require('express')
const router = express.Router()

const Person = require('../models/person.model')
const personRoutes = require('./person.routes')
const { InternalError } = require('../utils/errors.utils')


router.get('/health', (req, res) => {
    return res.sendStatus(200)
})

router.get('/info', (req, res, next) => {
    Person
        .count({})
        .then(numberPersons => {
            const info = {
                numberPersons,
                datetimeOfRequest: new Date().toString()
            }
            return res.render('info', { info })
        })
        .catch(() => {
            // assume server error
            next(new InternalError())
        })
})

// Person routes
router.use('/persons', personRoutes)


module.exports = router