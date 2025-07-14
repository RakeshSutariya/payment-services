const SERVER_ENVIRONMENTS = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
    LOCAL: 'local'
}

const API_LOG_ENABLE = {
    ON: 'ON',
    OFF: 'OFF'
}

const status_codes = {
    SUCCESS: 200,
    ALREADY_EXISTS: 409,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NO_DATA_FOUND: 204,
    ERROR: 500,
    TO_MANY_REQUEST: 429
}

const response_messages = {
    VALIDATION_ERROR: "Validation error. Please check your input data.",
    DATA_NOT_FOUND: "Data not found.",
    SUCCESS: "Success",
    FAILED: "Failed",
    TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
}

export {
    SERVER_ENVIRONMENTS,
    API_LOG_ENABLE,
    status_codes,
    response_messages
}