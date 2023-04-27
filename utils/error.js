myError = (statusCode, message) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = myError;
