const parseErrorResponse = (errorResponse) => {
  // Parse error response from the YouTube API
  const reason = errorResponse.data.error.errors[0].reason;
  const statusCode = errorResponse.data.error.code;

  let message;

  if (statusCode === 403 && reason === "commentsDisabled") {
    message = "Comments have been disabled for this video";
  } else {
    message = errorResponse.data.err.message;
  }

  return { statusCode, message };
};

module.exports = { parseErrorResponse };
