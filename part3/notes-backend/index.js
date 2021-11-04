const cors = require('cors')
const express = require('express')
// const morgan = require('morgan');

const Note = require('./models/note.model')
const { BadRequestError, InternalError, NotFoundError } = require('./utils/errors.utils')

const app = express()

// middleware
app.use(express.static('build')) // show react app
app.use(cors())
// app.use(morgan('dev'));
app.use(express.json())


// ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res, next) => {
    Note
        .find({})
        .then(notes => {
            return res.json(notes)
        })
        .catch(() => {
            return next(new InternalError())
        })
})

app.post('/api/notes', (req, res, next) => {
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
            res.status(201).json(savedNote)
        })
        .catch(err => {
            // assume bad request (failed validation)
            return next(new BadRequestError(err.message))
        })
})

app.get('/api/notes/:id', (req, res, next) => {
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

app.put('/api/notes/:id', (req, res, next) => {
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

app.delete('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note
        .findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(() => {
            // assume bad request not internal error for now
            return next(new BadRequestError('malformatted id'))
        })
})

// Route does not exist
app.use((req, res, next) => {
    return next(new NotFoundError())
})

// Error handler
app.use((err, req, res) => {
    const status = err.status || 500
    const msg = err.msg || 'something went wrong'
    return res.status(status).json({
        error: {
            msg,
            status
        }
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}`)
})