const mongoose = require('mongoose')
const Note = require('../models/note.model')
const supertest = require('supertest')
const server = require('../utils/server.utils')


const api = supertest(server())
const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true,
    },
]

beforeEach(async () => {
    await Note.deleteMany({})  // remove existing notes
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()  // add new note
    noteObject = new Note(initialNotes[1])
    await noteObject.save()  // add another new note
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 1000 * 20)

test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
        'Browser can execute only Javascript'
    )
})

afterAll(async () => {
    await mongoose.connection.close()
})