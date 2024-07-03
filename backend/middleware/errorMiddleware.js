const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode === 200 ? 500 : err.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found: ${req.originalUrl}`;
    statusCode = 404;
  }

  res
    .status(statusCode)
    .json({
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
};

export { notFound, errorHandler };