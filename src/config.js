module.exports = {
  headers: {
    sts: process.env.HEADERS_STRICT_TRANSPORT_SECURITY || "max-age=31536000; includeSubDomains",
    csp: process.env.HEADERS_CONTENT_SECURITY_POLICY || "default https:",
    xfo: process.env.HEADERS_X_FRAME_OPTIONS || "SAMEORIGIN",
    xss: process.env.HEADERS_X_XSS_PROTECTION || "1; mode=block",
    xco: process.env.HEADERS_X_CONTENT_TYPE_OPTIONS || "nosniff",
    ref: process.env.HEADERS_REFERRER_POLICY || "strict-origin-when-cross-origin"
  },
  lockers: {
    salt: process.env.LOCKER_SALT
  }
};