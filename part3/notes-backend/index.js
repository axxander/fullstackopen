const cors = require('cors');
const express = require('express');
// const morgan = require('morgan');

const Note = require('./models/note.model');
// const generateId = require('./utils/notes.utils');

const app = express();

// middleware
app.use(express.static('build')); // show react app
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());


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
    const body = req.body;

    // check note content not empty
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    note.save().then(savedNote => {
        res.json(savedNote);
    });
});

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            return res.json(note);
        })
        .catch(err => {
            return res.status(404).end();
        });
});


app.delete('/api/notes/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end();
    });
    // how to re-render the notes when delete?
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}`);
});