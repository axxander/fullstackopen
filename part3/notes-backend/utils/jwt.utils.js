const jwt = require('jsonwebtoken')


const verifyJwt = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        return {
            valid: true,
            expired: true,
            payload: decodedToken,
        }
    } catch (e) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            payload: null,
        }
    }
}


module.exports = verifyJwt