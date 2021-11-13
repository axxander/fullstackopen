const Blog = require('../models/blog.model')


const initialBlogs = [
    {
        title: 'Blog 1',
        author: 'John Doe',
        url: 'http://example.com',
        likes: 5,
    },
    {
        title: 'Blog 2',
        author: 'Jane Doe',
        url: 'http://example.com',
        likes: 10,
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'Blog Temporary',
        author: 'John Doe',
        url: 'http://example.com',
        likes: 1,
    })
    const savedBlog = await blog.save()
    await blog.remove()

    return savedBlog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}


module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
}