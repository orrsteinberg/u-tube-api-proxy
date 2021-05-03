const { parseErrorResponse } = require("./helpers");

const unknownEndpoint = (req, res, next) => {
  res.status(404);
  const error = new Error("Unknown endpoint");
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const error = {};

  if (err.response) {
    const { statusCode, message } = parseErrorResponse(err.response);
    error.statusCode = statusCode;
    error.message = message;
  } else {
    error.statusCode = 500;
    error.message = "Internal server error";
  }

  return res.status(error.statusCode).json({ message: error.message });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
