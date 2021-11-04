const express = require('express')

const Person = require('../models/person.model')
const { BadRequestError, InternalError, NotFoundError } = require('../utils/errors.utils')

const router = express.Router()


router.get('', (req, res, next) => {
    Person
        .find({})
        .then(persons => {
            return res.json(persons)
        })
        .catch(() => {
            // assume server error
            return next(new InternalError())
        })
})

router.post('', (req, res, next) => {
    const body = req.body
    if (!body.name || !body.number) {
        return next(new BadRequestError('name or number field not present'))
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => {
            return res.status(201).json(savedPerson)
        })
        .catch(err => {
            // assume validation error
            return next(new BadRequestError(err.message))
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Person
        .findById(id)
        .then(person => {
            if (person) {
                return res.json(person)
            } else {
                return next(new NotFoundError())
            }
        })
        .catch(err => {
            console.log(err)
            // assume badly formatted id provided
            return next(new BadRequestError('malformatted id'))
        })
})

router.put('/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number,
    }

    const id = req.params.id
    Person
        .findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => {
            return res.json(updatedPerson)
        })
        .catch(() => {
            // assume malformatted id
            return next(new BadRequestError('malformatted id'))
        })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Person
        .findByIdAndRemove(id)
        .then(() => {
            return res.sendStatus(204)
        })
        .catch(() => {
            return next(new InternalError())
        })
})


module.exports = router