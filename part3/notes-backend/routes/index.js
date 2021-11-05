const router = require('express').Router()

const notesRoutes = require('./notes.routes')


// Note routes
router.use('/notes', notesRoutes)


module.exports = router