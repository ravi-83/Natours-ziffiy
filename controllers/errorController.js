const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldError = (err) => {
  const value = err.keyValue.name;
  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired. Please log in again!', 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // Operation, trusted Error : Send meassage to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      // Programming or other unknown error : don't leak error details
    } else {
      // 1.) Log the error
      console.log('ERROR💥💥 : ', err);

      res.status(500).json({
        status: 'error',
        message: 'Somthing went very wrong!',
      });
    }
  } else {
    // Operation, trusted Error : Send meassage to client
    if (err.isOperational) {
      res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: err.message,
      });

      // Programming or other unknown error : don't leak error details
    } else {
      // 1.) Log the error
      console.log('ERROR💥💥 : ', err);

      res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: 'please try again later',
      });
    }
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV.includes('production')) {
    let error = { ...err };

    if (error['path'] && !error['errors']) {
      error = handleCastErrorDB(error);
      sendErrorProd(error, req, res);
    } else if (error.code === 11000) {
      error = handleDuplicateFieldError(error);
      sendErrorProd(error, req, res);
    } else if (error['errors']) {
      error = handleValidationErrorDB(error);
      sendErrorProd(error, req, res);
    } else if (error.name === 'JsonWebTokenError') {
      error = handleJWTError(error);
      sendErrorProd(error, req, res);
    } else if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError(error);
      sendErrorProd(error, req, res);
    } else {
      sendErrorProd(err, req, res);
    }
  }
};
