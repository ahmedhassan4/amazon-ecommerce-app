import AppError from "../utils/appError.js";

// uncompleted

const handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsErrorDB = (err) => {
  const duplicatedValue = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `You have Duplicate field value ${duplicatedValue}, please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = `Invalid Input Data`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => {
  const message = `invalid token. Please login again!`;
  return new AppError(message, 401);
};

const handleJWTExpiredError = (err) => {
  const message = `Your session(Token) has expired! Please login again.`;
  return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    console.log("is opertaila ");
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.error("ERROR!!!", err);
    res.status(500).json({
      stats: "error",
      message: "something went wrong",
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // let error = { ...err };
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    console.log(err.name);
    console.log("this error is cast error");
    if (err.name == "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError(err);
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError(err);

    sendErrorProd(err, res);
  }
};
