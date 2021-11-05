const router = require('express').Router()

const Note = require('../models/note.model')
const { BadRequestError, InternalError, NotFoundError } = require('../utils/errors.utils')


router.get('', (req, res, next) => {
    Note
        .find({})
        .then(notes => {
            return res.json(notes)
        })
        .catch(() => {
            return next(new InternalError())
        })
})

router.post('', (req, res, next) => {
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

    note
        .save()
        .then(savedNote => {
            return res.status(201).json(savedNote)
        })
        .catch(err => {
            console.log(err)
            // assume bad request (failed validation)
            return next(new BadRequestError(err.message))
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Note
        .findById(id)
        .then(note => {
            if (note) {
                return res.json(note)
            } else {
                return next(new NotFoundError())
            }
        })
        .catch(() => {
            // assume bad request not internal error for now
            return next(new BadRequestError('malformatted id'))
        })
})

router.put('/:id', (req, res, next) => {
    const body = req.body
    const note = {
        content: body.content,
        important: body.important,
    }

    const id = req.params.id
    Note
        .findByIdAndUpdate(id, note, { new: true }) // option passes updated document to event handler
        .then(updatedNote => {
            return res.json(updatedNote)
        })
        .catch(() => {
            // assume bad request not internal error for now
            return next(new BadRequestError('malformatted id'))
        })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Note
        .findByIdAndRemove(id)
        .then(() => {
            return res.sendStatus(204)
        })
        .catch(() => {
            // assume bad request not internal error for now
            return next(new BadRequestError('malformatted id'))
        })
})


module.exports = router