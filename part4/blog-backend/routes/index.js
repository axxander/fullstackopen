const router = require('express').Router()

const blogsRoutes = require('./blogs.routes')


// Blog routes
router.use('/blogs', blogsRoutes)


module.exports = router