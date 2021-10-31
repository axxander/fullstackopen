const express = require('express');
const router = express.Router();

const Person = require('../models/person.model');
const personRoutes = require('./person.routes');


router.get('/health', (req, res) => {
    return res.sendStatus(200);
});

router.get('/info', (req, res) => {
    Person
        .count({})
        .then(numberPersons => {
            const info = {
                numberPersons,
                datetimeOfRequest: new Date().toString()
            };
            return res.render('info', { info });
        });
});

// Person routes
router.use('/persons', personRoutes);


module.exports = router;