const router = require('express').Router()

const Blog = require('../models/blog.model')
const { InternalError } = require('../utils/errors.utils')


router.get('', (req, res, next) => {
    Blog
        .find({})
        .then(blogs => {
            return res.json(blogs)
        })
        .catch(() => {
            // assume internal error
            return next(new InternalError())
        })
})

router.post('', (req, res, next) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(savedBlog => {
            return res.status(201).json(savedBlog)
        })
        .catch(() => {
            // assume internal error
            return next(new InternalError())
        })
})


module.exports = router