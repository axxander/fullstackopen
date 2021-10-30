const mongoose = require('mongoose');

const noteSchema = new mongoose.schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;