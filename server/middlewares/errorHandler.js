module.exports.errorHandler = (error, req, res, next) => {
  let statusCode;
  if (error.code) statusCode = error.code;
  else statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.send({
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : ":(",
  });
};

module.exports.routeNotFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  return next(error);
};

