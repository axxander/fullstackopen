const mongoose = require('mongoose')
const supertest = require('supertest')

const { blogsInDb, initialBlogs } = require('./helpers')
const Blog = require('../models/blog.model')
const server = require('../utils/server.utils')


const api = supertest(server())


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blog object contains identification attribute called id', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(res.body[0].id).toBeDefined()
})

describe('add new blog', () => {
    test('with likes field given', async () => {
        const newBlog = {
            title: 'Blog 3',
            author: 'John Doe',
            url: 'http://example.com',
            likes: 20,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter).toHaveLength(initialBlogs.length + 1)

        const titles = blogsAfter.map(blog => blog.title)
        expect(titles).toContain('Blog 3')
    })

    test('with likes field not given', async () => {
        const newBlog = {
            title: 'Blog 3',
            author: 'John Doe',
            url: 'http://example.com',
        }
        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter).toHaveLength(initialBlogs.length + 1)

        const blog = blogsAfter.find(blog => blog.id === res.body.id)
        expect(blog.likes).toEqual(0)
    })

    test('with title missing', async () => {
        const newBlog = {
            author: 'John Doe',
            url: 'http://example.com',
        }
        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter).toHaveLength(initialBlogs.length)

        expect(res.body.error.msg).toMatch('`title` is required')
    })

    test('with url missing', async () => {
        const newBlog = {
            title: 'Blog 3',
            author: 'John Doe',
        }
        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter).toHaveLength(initialBlogs.length)

        expect(res.body.error.msg).toMatch('`url` is required')
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})