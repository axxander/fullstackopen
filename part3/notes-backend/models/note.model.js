const mongoose = require('mongoose')


// Note Schema
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    important: {
        type: Boolean,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

// Remove __v field and rename _id to id
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Note Model
const Note = mongoose.model('Note', noteSchema)


module.exports = Note