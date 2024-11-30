const successResponse = (message, data, others) => {
    return {
        status: true,
        message,
        ...others,
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