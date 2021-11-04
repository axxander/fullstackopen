const errorHandler = (err, req, res) => {
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