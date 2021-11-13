const router = require('express').Router()

const Blog = require('../models/blog.model')
const { BadRequestError, InternalError } = require('../utils/errors.utils')


router.get('', async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        return res.json(blogs)
    } catch {
        // assume internal error
        return next(new InternalError())
    }
})

router.post('', async (req, res, next) => {
    const body = req.body
    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog(body)
    try {
        const savedBlog = await blog.save()
        return res.status(201).json(savedBlog)
    } catch (e) {
        // assume validation error
        return next(new BadRequestError(e.message))
    }
})


module.exports = router