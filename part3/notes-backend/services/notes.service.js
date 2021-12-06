const { Note } = require('../models/index')


const findNote = async (id) => {
    return Note.findById(id)
}

const findNotes = async () => {
    return Note.find({})
}

const createNote = async (note) => {
    return Note.create(note)
}

const findAndUpdateNote = async (id, update) => {
    return Note.findByIdAndUpdate(id, update, { new: true })
}

const deleteNote = async (id) => {
    return Note.findByIdAndRemove(id)
}


module.exports = {
    findNote,
    findNotes,
    createNote,
    deleteNote,
    findAndUpdateNote,
}