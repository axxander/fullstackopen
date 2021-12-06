const verifyJwt = require('../utils/jwt.utils')
const { UnauthorizedError } = require('../utils/errors.utils')


const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const deserializeUser = async (req, res, next) => {
    const accessToken = getTokenFrom(req)
    if (!accessToken) {
        return next()
        // return next(new UnauthorizedError('token missing'))
    }

    const { payload, expired } = verifyJwt(accessToken)
    if (payload) {
        res.locals.user = payload
        return next()
    }

    if (expired) {
        return next(new UnauthorizedError('token expired'))
    }
}

const requiresUser = (req, res, next) => {
    const user = res.locals.user

    if (!user) {
        return next(new UnauthorizedError('must be authenticated to create a note'))
    }

    return next()
}


module.exports = {
    deserializeUser,
    requiresUser,
}