const router = require('express').Router()

const notesRoutes = require('./notes.routes')
const userRoutes = require('./users.routes')
const sessionsRoutes = require('./sessions.routes')


router.use('/notes', notesRoutes)
router.use('/users', userRoutes)
router.use('/sessions', sessionsRoutes)


module.exports = router