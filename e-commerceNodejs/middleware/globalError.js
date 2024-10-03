const AppError = require("../utilities/appError");

const generateError = (err) => {
  switch(err.name){
    case "CastError":
      return new AppError(`invalid ${err.path}: ${err.value} `, 400);
    case "ValidationError":
      return new AppError(`validation error`, 422 ,
          Object.keys(err.errors).map( key => ({
            [key]: err.errors[key].message
          }))
        );
    // case "JsonWebTokenError":
    //   return new AppError("401 You are not authorized to access this", 401);
    default:
      return err;
  }
}

// castError -> type of error when inval

module.exports = (err,req,res,next) => {    
    const error = generateError(err);
    error.statusCode = error.statusCode || 500; //(server error)

    const response = {
      status: error.status,
      message: error.message,
    }

    if(err.errors){
      response.errors = error.errors;
    }

    // in case of development phase then add this
    // but in case of production phase don't add this
    if(process.env.ENV == "dev"){
      response.err = err;
      response.stack = err.stack; //stack shows you in which file did this error happen 
    }
    res.status(err.statusCode).json(response);
  }