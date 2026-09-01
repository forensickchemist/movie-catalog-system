function errorHandler(err, req, res, next) {
    console.error(err.stack || err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let details = err.details || null;

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID";
        details = null;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
        details = Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message
        }));
    }

    // Duplicate MongoDB value
    if (err.code === 11000) {
        statusCode = 409;
        message = "A record with that value already exists";
        details = err.keyValue || null;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        details
    });
}

module.exports = errorHandler;