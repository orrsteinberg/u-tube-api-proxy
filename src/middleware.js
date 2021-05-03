const { parseErrorResponse } = require("./helpers");

const unknownEndpoint = (req, res) => {
  return res.status(404).json({ message: "Unknown endpoint" });
};

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const error = {};

  if (err.response.data) {
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
