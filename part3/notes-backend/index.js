const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');

const Note = require('./models/note.model');
const generateId = require('./utils/notes.utils');

const app = express();

// middleware
app.use(express.static('build')); // show react app
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());


// Connect to database
const uri = `mongodb+srv://fullstack:${process.env.MONGO_PASSWORD}@cluster0.wveyy.mongodb.net/note-app?retryWrites=true&w=majority`;
mongoose.connect(uri);


// ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);
    });
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
    console.log(`Server live at http://localhost:${PORT}`);
});