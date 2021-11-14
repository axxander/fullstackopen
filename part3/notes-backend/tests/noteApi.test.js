const mongoose = require('mongoose')
const supertest = require('supertest')

const { initialNotes, nonExistingId, notesInDb } = require('./testHelpers')
const Note = require('../models/note.model')
const server = require('../utils/server.utils')


const api = supertest(server())


beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(initialNotes)
})

describe('when there are initially some saved notes', () => {
    test('notes are returned as JSON', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const res = await api
            .get('/api/notes')
            .expect(200)

        const body = res.body
        expect(body).toHaveLength(initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const res = await api
            .get('/api/notes')

        const contents = res.body.map(n => n.content)
        expect(contents).toContain('Browser can execute only Javascript')
    })
})


describe('addition of new note', () => {
    test('succeeds with valid contents field', async () => {
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

    test('fails with 400 with invalid contents field', async () => {
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

describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
        const notesStart = await notesInDb()
        const noteToView = notesStart[0]

        const note = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
        expect(note.body).toEqual(processedNoteToView)
    })

    test('fails with 404 if note does not exist', async () => {
        const id = await nonExistingId()
        await api
            .get(`/api/notes/${id}`)
            .expect(404)
    })

    test('fails with 400 if id is invalid', async () => {
        const id = 'erroneous'
        const res = await api
            .get(`/api/notes/${id}`)
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})


describe('deletion of a note', () => {
    test('succeeds with 204 if id is valid', async () => {
        const notesStart = await notesInDb()
        const noteToDelete = notesStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAfter = await notesInDb()
        expect(notesAfter).toHaveLength(initialNotes.length - 1)

        const contents = notesAfter.map(n => n.content)
        expect(contents).not.toContain(noteToDelete.content)
    })

    test('succeeds with 204 if does not exist (idempotent)', async () => {
        const id = await nonExistingId()
        await api
            .delete(`/api/notes/${id}`)
            .expect(204)
    })

    test('fails with 400 if id is invalid', async () => {
        const id = 'erroneous'
        const res = await api
            .delete(`/api/notes/${id}`)
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})

describe('updating a note', () => {
    test('succeeds with valid body', async () => {
        const notesStart = await notesInDb()
        const noteToUpdate = notesStart[0]
        const updatedNote = {
            content: 'this is an updated note using PUT',
        }

        await api
            .put(`/api/notes/${noteToUpdate.id}`)
            .send(updatedNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const notesAfter = await notesInDb()
        // get note we just updated
        const { content } = notesAfter.find(n => n.id === noteToUpdate.id)
        // check updated content not old content
        expect(content).toContain(updatedNote.content)
    })

    test('fails with 404 if note does not exist', async () => {
        const id = await nonExistingId()
        await api
            .put(`/api/notes/${id}`)
            .expect(404)
    })

    test('fails with 400 if invalid id', async () => {
        const id = 'erroneous'
        const res = await api
            .put(`/api/notes/${id}`)
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})