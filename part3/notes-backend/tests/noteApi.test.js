const mongoose = require('mongoose')
const supertest = require('supertest')

const { initialNotes, notesInDb } = require('./testHelpers')
const Note = require('../models/note.model')
const server = require('../utils/server.utils')


const api = supertest(server())


beforeEach(async () => {
    await Note.deleteMany({})

    let noteObject = new Note(initialNotes[0])
    await noteObject.save()

    noteObject = new Note(initialNotes[1])
    await noteObject.save()
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


describe('add new note', () => {
    test('with valid contents field', async () => {
        const newNote = {
            content: 'An example note',
            important: true,
        }
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const notesAfter = await notesInDb()
        expect(notesAfter).toHaveLength(initialNotes.length + 1)

        const contents = notesAfter.map(n => n.content)
        expect(contents).toContain('An example note')
    })

    test('with invalid contents field', async () => {
        const newNote = {
            important: true,
        }
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

        const notesAfter = await notesInDb()
        expect(notesAfter).toHaveLength(initialNotes.length)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})