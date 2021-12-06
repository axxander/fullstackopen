const { User } = require('../models/index')


const findUser = async (options) => {
    return options.id ? User.findById(options.id) : User.findOne(options)
}

const findUserWithNotes = async (options) => {
    return options.id
        ? User.findById(options.id).populate('notes', { content: 1, important: 1, date: 1 })
        : User.findOne(options).populate('notes', { content: 1, important: 1, date: 1 })
}

const findUsers = async () => {
    return User.find({})
}

const findUsersWithNotes = async () => {
    return User.find({}).populate('notes', { content: 1, important: 1, date: 1 })
}

// testing using a try catch statement within service
const createUser = async (user) => {
    return User.create(user)
}

const addNoteToUserDocument = async (userId, noteId) => {
    const user = await findUser(userId)
    user.notes = user.notes.concat(noteId)
    return user.save()
}


module.exports = {
    findUser,
    findUserWithNotes,
    findUsers,
    findUsersWithNotes,
    createUser,
    addNoteToUserDocument,
}