const express = require('express');

const { ApiError } = require('../utils/errors.utils');

const router = express.Router();


const persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];


router.get('', (req, res) => {
    return res.json(persons);
});

router.post('', (req, res, next) => {
    if (persons.some(person => person.name.toUpperCase() === req.body.name.toUpperCase())) {
        return next(new ApiError(409, 'name must be unique'));
    }
    if (persons.some(person => person.number === req.body.number)) {
        return next(new ApiError(409, 'number must be unique'));
    }
    const newId = persons[persons.length - 1].id + 1;
    const newContact = {
        ...req.body,
        id: newId,
    };
    persons.push(newContact);
    return res.status(201).json(newContact);
});

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const person = persons.filter(person => person.id === id);
    if (person.length === 0) {
        return next(new NotFoundError());
    }
    return res.json(person);
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = persons.findIndex(person => person.id === id);
    if (idx !== -1) {
        persons.splice(idx, 1); // mutates array: exported persons works now
    }
    return res.sendStatus(204);
});


/*
Exporting both the persons object and routes. This is not standard, but for
the purposes of this exercise and lack of database, this is a quick hack to
get the more generic routes to display correctly.
*/
module.exports = { persons, personsRoutes: router };