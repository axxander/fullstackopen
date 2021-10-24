const express = require('express');
const router = express.Router();

const { persons, personsRoutes } = require('./persons.routes');

router.get('/health', (req, res) => {
    return res.sendStatus(200);
});

router.get('/info', (req, res) => {
    const info = {
        numberPersons: persons.length,
        datetimeOfRequest: new Date().toString()
    };
    return res.render('info', { info });
});

// Persons routes
router.use('/persons', personsRoutes);

module.exports = router;