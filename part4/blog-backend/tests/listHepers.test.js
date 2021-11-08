const { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes } = require('../utils/listHelpers.utils')

test('dummy returns 1', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has no blogs, defaults to zero likes', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })
})

describe('favourite', () => {

    const blogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        }
    ]

    test('is empty object when empty list of blog posts', () => {
        const result = favouriteBlog([])
        expect(result).toEqual({})
    })

    test('is blog with most likes from list of blog posts', () => {
        const result = favouriteBlog(blogs)
        expect(result).toEqual(
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            }
        )
    })

    test('is the only blog in the list when list contains single blog', () => {
        const result = favouriteBlog([
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            }
        ])
        expect(result).toEqual(
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            }
        )
    })
})

describe('most blogs', () => {

    const blogs = [
        { author: 'Jane Doe' },
        { author: 'Jane Doe' },
        { author: 'Jane Doe' },
        { author: 'John Doe' },
        { author: 'John Doe' },
        { author: 'John Smith' }
    ]

    test('is empty object when blogs list is empty', () => {
        const result = mostBlogs([])
        expect(result).toEqual({})
    })

    test('is only author when blogs list contains single blog', () => {
        const result = mostBlogs(
            [
                {
                    author: 'Alex G',
                },
            ]
        )
        expect(result).toEqual(
            {
                author: 'Alex G',
                blogs: 1,
            }
        )
    })

    test('is correct author when blogs list contains many blogs', () => {
        const result = mostBlogs(blogs)
        const expectedResult = {
            author: 'Jane Doe',
            blogs: 3,
        }
        expect(result).toEqual(expectedResult)
    })
})

describe('most likes', () => {

    const blogs = [
        { author: 'Jane Doe', likes: 1 },
        { author: 'Jane Doe', likes: 3 },
        { author: 'Jane Doe', likes: 10 },
        { author: 'John Doe', likes: 10 },
        { author: 'John Doe', likes: 2 },
        { author: 'John Smith', likes: 9 },
    ]

    test('is empty object when blogs list is empty', () => {
        const result = mostLikes([])
        expect(result).toEqual({})
    })

    test('is only author when blogs list contains single blog', () => {
        const result = mostLikes([{ author: 'John Doe', likes: 5 }])
        expect(result).toEqual({ author: 'John Doe', likes: 5 })
    })

    test('is correct author when blogs list contains many blogs', () => {
        const result = mostLikes(blogs)
        expect(result).toEqual({ author: 'Jane Doe', likes: 14 })
    })
})