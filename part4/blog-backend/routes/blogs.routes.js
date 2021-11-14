const router = require('express').Router()

const Blog = require('../models/blog.model')
const { BadRequestError, InternalError, NotFoundError } = require('../utils/errors.utils')


router.get('', async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        return res.json(blogs)
    } catch {
        // assume internal error
        return next(new InternalError())
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const blog = await Blog.findById(id)
        return blog ? res.json(blog) : next(new NotFoundError())
    } catch {
        return next(new BadRequestError('malformatted id'))
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

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        await Blog.findByIdAndDelete(id)
        return res.sendStatus(204)
    } catch {
        // assume bad request not internal error for now
        return next(new BadRequestError('malformatted id'))
    }
})

router.put('/:id', async (req, res, next) => {
    const body = req.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const id = req.params.id
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        return updatedBlog ? res.json(updatedBlog) : next(new NotFoundError())
    } catch {
        return next(new BadRequestError('malformatted id'))
    }
})


module.exports = router