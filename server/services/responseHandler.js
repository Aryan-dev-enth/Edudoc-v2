
const successHandler = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data
    });
};

const errorHandler = (res, error = null) => {
    const statusCode = error && error.statusCode ? error.statusCode : 500;
    const message = error && error.message ? error.message : 'An error occurred';
    
    const response = {
        status: 'error',
        message,
    };

    if (error) {
        response.error = {
            message: error.message,
            stack: error.stack
        };
    }

    res.status(statusCode).json(response);
};

export { successHandler, errorHandler };
