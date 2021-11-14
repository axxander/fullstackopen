const mongoose = require('mongoose')
const supertest = require('supertest')

const { blogsInDb, initialBlogs, nonExistingId } = require('./helpers')
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

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsStart = await blogsInDb()
        const blogToView = blogsStart[0]

        const res = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blog = res.body
        expect(blog).toEqual(
            expect.objectContaining(blogToView)
        )
    })

    test('fails with 404 if blog does not exist', async () => {
        const id = await nonExistingId()
        await api
            .get(`/api/blogs/${id}`)
            .expect(404)
    })

    test('fails with 400 if id is invalid', async () => {
        const id = 'erroneous'
        const res = await api
            .get(`/api/blogs/${id}`)
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})

describe('addition of new blog', () => {
    test('succeeds with valid body', async () => {
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

    test('succeeds with valid body and sets likes to 0 if not given', async () => {
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

    test('fails with 400 if title missing', async () => {
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

    test('fails with 400 if url missing', async () => {
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

describe('deletion of blog', () => {
    test('succeeds with 204 note exists', async () => {
        const blogsStart = await blogsInDb()
        const blogToDelete = blogsStart[0]

        const res = await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter).toHaveLength(initialBlogs.length - 1)

        // check deleted blog is missing
        expect(res.body).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining(blogToDelete)
            ])
        )
    })

    test('succeeds with 204 if does not exist', async () => {
        const id = await nonExistingId()
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)
    })

    test('fails with 400 if id is invalid', async () => {
        const id = 'erroneous'
        const res = await api
            .delete(`/api/blogs/${id}`)
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})

describe('update likes field of blog', () => {
    test('succeeds if blog exists', async () => {
        const blogsStart = await blogsInDb()
        const blogToUpdate = blogsStart[0]
        const updatedBlogLikes = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlogLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()
        const { likes } = blogsAfter.find(b => b.id === blogToUpdate.id)
        expect(likes).toEqual(blogToUpdate.likes + 1)
    })

    test('fails with 404 if blog does not exist', async () => {
        const id = await nonExistingId()
        await api
            .put(`/api/blogs/${id}`)
            .send({})
            .expect(404)
    })

    test('fails with 400 if invalid id', async () => {
        const id = 'erroneous'
        const res = await api
            .put(`/api/blogs/${id}`)
            .send({})
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})