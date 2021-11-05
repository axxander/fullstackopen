// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    const msg = err.msg || 'something went wrong'
    return res.status(status).json({
        error: {
            msg,
            status
        }
    })
}

module.exports = errorHandler