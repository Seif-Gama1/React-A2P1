module.exports = class AppError extends Error {
    constructor(message,statusCode, errors) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        
        // in case of validation error
        if (statusCode === 422) {
            this.errors = errors || null;
        }
    }
}