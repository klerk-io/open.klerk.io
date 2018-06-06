class ThrowableResponseError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export default class ResponseError {
  constructor() {
    // nothing
  }

  unauthorized(message = "You are not allowed to access this resource.") {
   throw new ThrowableResponseError(401, "Unauthorized", message);
  }

  notFound(message = "Resource could not be found.") {
   throw new ThrowableResponseError(404, "Not Found", message);
  }

  gone(message = "Resource is gone. Stop looking for it.") {
   throw new ThrowableResponseError(410, "Gone", message);
  }

  tooManyRequests(message = "You are sending too many requests. Slow down.") {
   throw new ThrowableResponseError(429, "Too Many Requests", message);
  }

  internalError(message = "We are experiencing some trouble. Please file a bug report on Github.") {
   throw new ThrowableResponseError(500, "Internal Error", message);
  }
}