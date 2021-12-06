const bcrypt = require('bcrypt')

const { BadRequestError, ConflictError, InternalError, NotFoundError } = require('../utils/errors.utils')
const { createUser, findUserWithNotes, findUsersWithNotes } = require('../services/users.service')


const getUserHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await findUserWithNotes({ id })
        return user ? res.json(user) : next(new NotFoundError())
    } catch {
        return next(new BadRequestError())
    }
}

const getUsersHandler = async (req, res, next) => {
    try {
        const users = await findUsersWithNotes()
        console.log(typeof users, users)
        return res.json(users)
    } catch {
        // since no filtering assume internal error
        return next(new InternalError())
    }
}

const createUserHandler = async (req, res, next) => {
    const body = req.body

    // need to tidy this up
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = {
        username: body.username,
        name: body.name,
        passwordHash,
    }

    try {
        const savedUser = await createUser(user)
        return res.status(201).json(savedUser)
    } catch (e) {
        return e.message.includes('`username` to be unique')
            ? next(new ConflictError(e.message))
            : next(new BadRequestError(e.message))
    }
}


module.exports = {
    getUserHandler,
    getUsersHandler,
    createUserHandler,
}