const { countBy } = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (favouriteBlog, blog) => {
        return blog.likes > favouriteBlog.likes
            ? blog
            : favouriteBlog
    }
    return blogs.length === 0 ? {} : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authorBlogs = countBy(blogs, blog => blog.author)
    const reducer = (authorMostBlogs, author) => {
        if (!authorMostBlogs) {
            return author
        }
        return authorBlogs[authorMostBlogs] > authorBlogs[author]
            ? authorMostBlogs
            : author
    }
    // get author name who has mosted blog posts
    const authorMostBlogs = Object.keys(authorBlogs).reduce(reducer, null)

    return {
        author: authorMostBlogs,
        blogs: authorBlogs[authorMostBlogs]
    }
}

const mostLikes = (blogs) => {

    const authorTotalLikes = blogs.reduce((authorLikes, { author, likes }) => {
        authorLikes[author] = authorLikes[author] || 0
        authorLikes[author] += likes
        return authorLikes
    }, {})

    const authorMostLikes = Object.keys(authorTotalLikes).reduce((most, author) => {
        if (most === {}) {
            return { author, likes: authorTotalLikes[author] }
        }
        const likes = authorTotalLikes[author]
        return most.likes > likes
            ? most
            : { author, likes }
    }, {})

    return authorMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}