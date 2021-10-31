const express = require('express');

const Person = require('../models/person.model');
const { BadRequestError, InternalError, NotFoundError } = require('../utils/errors.utils');

const router = express.Router();


router.get('', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons);
        });
});

router.post('', (req, res, next) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return next(new BadRequestError('name or number field not present'));
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person
        .save()
        .then(savedPerson => {
            res.status(201).json(savedPerson);
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Person
        .findById(id)
        .then(person => {
            if (person) {
                return res.json(person);
            } else {
                return next(new NotFoundError());
            }
        })
        .catch(err => {
            console.log(err);
            // handle error: badly formatted id provided
            return next(new BadRequestError('malformatted id'));
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Person
        .findByIdAndRemove(id)
        .then(person => {
            return res.sendStatus(204);
        })
        .catch(err => {
            return next(new InternalError());
        });
});


module.exports = router;