const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { findUser } = require('../services/users.service')
const { UnauthorizedError, InternalError } = require('../utils/errors.utils')


const createTokenHandler = async (req, res, next) => {
    const body = req.body
    const user = await findUser({ username: body.username })

    try {
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return next(new UnauthorizedError('invalid username or password'))
        }

        const token = jwt.sign({
            username: user.username,
            id: user._id,
        }, process.env.SECRET, { expiresIn: 60 * 60 })

        return res.json({ token: token })

        // return res.json({
        //     token,
        //     username: user.username,
        //     name: user.name,
        // })
    } catch {
        return next(new InternalError())
    }
}


module.exports = {
    createTokenHandler,
}