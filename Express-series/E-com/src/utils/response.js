const sendErrorResponse = (res , err) => {
    let statusCode = parseInt(err.statusCode) || 500
    let message = err.message

    return res.status(statusCode).json({message : message})
}

const sendSuccessResponse = (res , data ) => {
    return res.status(200).json({data:data})
}

module.exports = {
    sendErrorResponse,
    sendSuccessResponse
}