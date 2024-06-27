export class ApplicationError extends Error {
  status: number;
  code: string;
  date: string;
  constructor(message: string, status = 400, code: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError);
    }
    const date = new Date();
    this.name = "ApplicationError";
    this.code = code;
    this.status = status;
    this.date = date.toISOString();
  }
}

class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message, 400, "BadRequestError");
    this.name = "BadRequestError";
  }
}

class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 400, "ValidationError");
    this.name = "ValidationError";
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message, 401, "UnauthorizedError");
    this.name = "UnauthorizedError";
  }
}

class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, 404, "NotFoundError");
    this.name = "NotFoundError";
  }
}

class InternalServerError extends ApplicationError {
  constructor(message: string) {
    super(message, 500, "InternalServerError");
    this.name = "InternalServerError";
  }
}

class InternalError extends ApplicationError {
  constructor(message: string) {
    super(message, 500, "InternalError");
    this.name = "InternalError";
  }
}

class InsufficientBalanceError extends ApplicationError {
  constructor(message: string) {
    super(message, 400, "InsufficientBalanceError");
    this.name = "InsufficientBalanceError";
  }
}

class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message, 409, "ConflictError");
    this.name = "ConflictError";
  }
}
class ForbiddenError extends ApplicationError {
  constructor(message: string) {
    super(message, 403, "ForbiddenError");
    this.name = "ForbiddenError";
  }
}
class ServiceError extends ApplicationError {
  constructor(message: string) {
    super(message, 503, "ServiceError");
    this.name = "ServiceError";
  }
}

export default {
  NotFoundError,
  InternalError,
  BadRequestError,
  ValidationError,
  InternalServerError,
  InsufficientBalanceError,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
  ServiceError,
};
