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

class ConflictError extends ApiError {
    constructor(msg = 'Conflict') {
        super(409, msg)
    }
}

class UnauthorizedError extends ApiError {
    constructor(msg = 'Unauthorized') {
        super(401, msg)
    }
}

class ForbiddenError extends ApiError {
    constructor(msg = 'Forbidden') {
        super(403, msg)
    }
}

module.exports = {
    ApiError,
    BadRequestError,
    NotFoundError,
    InternalError,
    ConflictError,
    UnauthorizedError,
    ForbiddenError,
}