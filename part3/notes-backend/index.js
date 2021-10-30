const cors = require('cors');
const express = require('express');
// const morgan = require('morgan');

const app = express();

const generateId = require('./utils/notes.utils');

// middleware
app.use(express.static('build')); // show react app
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());

// mock db for notes
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const body = request.body;

    // check note content not empty
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    // construct new note
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(notes),
    };

    // update notes
    notes = notes.concat(note);

    res.json(note);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);
    if (!note) {
        return res.status(404).end();
    }
    return res.json(note);
});


app.delete('/api/notes/:id', (req, res) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    // delete idempotent: returns same response regardless
    res.status(204).end();
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});