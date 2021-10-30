const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

// Remove __v field and rename _id to id
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;