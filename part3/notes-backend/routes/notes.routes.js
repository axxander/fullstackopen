const router = require('express').Router()

const Note = require('../models/note.model')
const { BadRequestError, InternalError, NotFoundError } = require('../utils/errors.utils')


router.get('', async (req, res, next) => {
    try {
        const notes = await Note.find({})
        return res.json(notes)
    } catch {
        return next(new InternalError())
    }
})

router.post('', async (req, res, next) => {
    const body = req.body

    // check note content not empty
    if (!body.content) {
        return next(new BadRequestError('content field not present'))
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    try {
        const savedNote = await note.save()
        return res.status(201).json(savedNote)
    } catch (e) {
        console.log(e)
        return next(new BadRequestError(e.message))
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const note = await Note.findById(id)
        return note ? res.json(note) : next(new NotFoundError())
    } catch {
        // assume bad request not internal error for now
        return next(new BadRequestError('malformatted id'))
    }
})

router.put('/:id', async (req, res, next) => {
    const body = req.body
    const note = {
        content: body.content,
        important: body.important,
    }

    const id = req.params.id
    try {
        // new: true option: passes updated document to event handler not original
        const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true })
        return res.json(updatedNote)
    } catch {
        // assume bad request not internal error
        return next(new BadRequestError('malformatted id'))
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        await Note.findByIdAndRemove(id)
        return res.sendStatus(204)
    } catch {
        // assume bad request not internal error for now
        return next(new BadRequestError('malformatted id'))
    }
})


module.exports = router