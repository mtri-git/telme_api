const successResponse = (message, data) => {
    return {
        status: true,
        message,
        data
    }
}

const errorResponse = (code, message) => {
    return {
        status: false,
        code,
        message
    }
}

module.exports = {
    successResponse,
    errorResponse
}