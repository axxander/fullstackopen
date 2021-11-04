// Generic error
class ApiError extends Error {
    constructor(status, msg) {
        super()
        this.status = status
        this.msg = msg
    }
}

// Common errors
class BadRequestError extends ApiError {
    constructor(msg = 'Bad request') {
        super(400, msg)
    }
}

class NotFoundError extends ApiError {
    constructor(msg = 'Not found') {
        super(404, msg)
    }
}

class InternalError extends ApiError {
    constructor(msg = 'Internal server error') {
        super(500, msg)
    }
}

module.exports = {
    ApiError,
    BadRequestError,
    NotFoundError,
    InternalError
}