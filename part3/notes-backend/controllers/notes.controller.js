const { BadRequestError, InternalError, NotFoundError } = require('../utils/errors.utils')
const { createNote, deleteNote, findAndUpdateNote, findNote, findNotes } = require('../services/notes.service')
const { addNoteToUserDocument } = require('../services/users.service')


const getNoteHandler = async (req, res, next) => {
    const id = req.params.id

    try {
        const note = await findNote({ id })
        return note ? res.json(note) : next(new NotFoundError())
    } catch {
        return next(new BadRequestError('malformatted id'))
    }
}

const getNotesHandler = async (req, res, next) => {
    try {
        const notes = await findNotes()
        return res.json(notes)
    } catch {
        return next(new InternalError())
    }
}

const deleteNoteHandler = async (req, res, next) => {
    const id = req.params.id

    try {
        await deleteNote(id)
        return res.sendStatus(204)
    } catch {
        return next(new BadRequestError('malformatted id'))
    }
}

const updateNoteHandler = async (req, res, next) => {
    const body = req.body
    const update = {
        content: body.content,
    }
    if (body.important) {
        update.important = body.important
    }

    const id = req.params.id
    try {
        const updatedNote = await findAndUpdateNote(id, update)
        return updatedNote ? res.json(updatedNote) : next(new NotFoundError())
    } catch {
        return next(new BadRequestError('malformatted id'))
    }
}

const createNoteHandler = async (req, res, next) => {
    const body = req.body
    const user = res.locals.user

    // need to add proper input validation: Joi?
    if (!body.content) {
        return next(new BadRequestError('empty content field'))
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user.id,
    }

    try {
        const savedNote = await createNote(note)
        await addNoteToUserDocument(user.id, savedNote._id.toString())
        return res.status(201).json(savedNote)
    } catch (e) {
        console.log(e)
        return next(new BadRequestError(e.message))
    }
}


module.exports = {
    getNoteHandler,
    getNotesHandler,
    deleteNoteHandler,
    updateNoteHandler,
    createNoteHandler,
}