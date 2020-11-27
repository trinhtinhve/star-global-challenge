const ErrorCode = require('./error.code');

class BaseError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class HttpError extends BaseError {
  constructor({ httpCode, code, message }) {
    super(message);
    this.code = code;
    this.httpCode = httpCode;
  }
}

class ValidationError extends HttpError {
  constructor({ code, message }) {
    super({ httpCode: 400, code, message });
  }
}

class UnauthorizedError extends HttpError {
  constructor({ code, message }) {
    super({ httpCode: 401, code, message });
  }
}

class ForbiddenError extends HttpError {
  constructor({ code, message }) {
    super({ httpCode: 403, code, message });
  }
}

class NotFoundError extends HttpError {
  constructor({ code, message }) {
    super({ httpCode: 404, code, message });
  }
}

class InternalServerError extends HttpError {
  constructor({ code, message }) {
    super({ httpCode: 500, code, message });
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const httpCode = err.httpCode || 500;
  const code = err.code || 'wishlist-500';
  const message = err.message || 'Server Internal Error';

  const errorObj = {
    error: {
      code,
      message
    }
  };

  res.status(httpCode).json(errorObj);
}

module.exports = {
  ErrorCode,
  HttpError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  errorHandler
};

