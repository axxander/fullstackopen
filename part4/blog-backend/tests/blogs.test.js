const mongoose = require('mongoose')
const supertest = require('supertest')

const { blogsInDb, initialBlogs } = require('./helpers')
const Blog = require('../models/blog.model')
const server = require('../utils/server.utils')


const api = supertest(server())


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blog object contains identification attribute called id', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(res.body[0].id).toBeDefined()
})

test('add new blog', async () => {
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

afterAll(async () => {
    await mongoose.connection.close()
})