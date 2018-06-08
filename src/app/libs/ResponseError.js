class ModofunError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export default class ResponseError {
  constructor(status = null, code = null, message = null) {
    if (status || code || message) {
      throw new ModofunError(status || 200, code || "OK", message || "Success");
    }
  }

  unauthorized(message = "You are not allowed to access this resource.") {
   throw new ModofunError(401, "Unauthorized", message);
  }

  notFound(message = "Resource could not be found.") {
   throw new ModofunError(404, "Not Found", message);
  }

  gone(message = "Resource is gone. Stop looking for it.") {
   throw new ModofunError(410, "Gone", message);
  }

  tooManyRequests(message = "You are sending too many requests. Slow down.") {
   throw new ModofunError(429, "Too Many Requests", message);
  }

  internalError(message = "We are experiencing some trouble. Please file a bug report on Github.") {
   throw new ModofunError(500, "Internal Error", message);
  }
}