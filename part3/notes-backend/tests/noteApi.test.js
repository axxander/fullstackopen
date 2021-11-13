const mongoose = require('mongoose')
const supertest = require('supertest')

const { initialNotes, nonExistingId, notesInDb } = require('./testHelpers')
const Note = require('../models/note.model')
const server = require('../utils/server.utils')


const api = supertest(server())


beforeEach(async () => {
    await Note.deleteMany({})

    const noteObjects = initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
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

describe('get a note', () => {
    test('with a valid id associated to an existing note', async () => {
        const notesStart = await notesInDb()
        const noteToView = notesStart[0]

        const note = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
        expect(note.body).toEqual(processedNoteToView)
    })

    test('with a valid id not associated with an existing note', async () => {
        const id = await nonExistingId()
        await api
            .get(`/api/notes/${id}`)
            .expect(404)
    })

    test('with an invalid id', async () => {
        const id = 'erroneous'
        const res = await api
            .get(`/api/notes/${id}`)
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})


describe('delete a note', () => {
    test('with a valid id associated to existing note', async () => {
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

    test('with a valid id not associated to existing note', async () => {
        const id = await nonExistingId()
        await api
            .delete(`/api/notes/${id}`)
            .expect(204)
    })

    test('with an invalid id', async () => {
        const id = 'erroneous'
        const res = await api
            .delete(`/api/notes/${id}`)
            .expect(400)

        expect(res.body.error.msg).toMatch('malformatted id')
    })
})

describe('update a note', () => {
    test('with a valid id associated to existing note', async () => {
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

    test('with a valid id not associated to existing note', async () => {
        const id = await nonExistingId()
        await api
            .put(`/api/notes/${id}`)
            .expect(404)
    })

    test('with an invalid id', async () => {
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