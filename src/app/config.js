module.exports = {
  app : {
    platform: process.env.APP_PLATFORM || "gcloud",
    gcloud: {
      appCredentials: process.env.GCLOUD_APP_CREDENTIALS,
      projectId: process.env.GCLOUD_PROJECT_ID
    }
  },
  headers: {
    access: {
      headers: process.env.HEADERS_ACCESS_CONTROL_ALLOW_HEADERS || "Content-Type",
      methods: process.env.HEADERS_ACCESS_CONTROL_ALLOW_METHODS || "OPTIONS, POST, GET, PUT, DELETE",
      origin: process.env.HEADERS_ACCESS_CONTROL_ALLOW_ORIGIN || "*",
      expose: process.env.HEADERS_ACCESS_CONTROL_EXPOSE_HEADERS || "Content-Length"
    },
    security: {
      sts: process.env.HEADERS_STRICT_TRANSPORT_SECURITY || "max-age=31536000; includeSubDomains",
      csp: process.env.HEADERS_CONTENT_SECURITY_POLICY || "default https:",
      xfo: process.env.HEADERS_X_FRAME_OPTIONS || "SAMEORIGIN",
      xss: process.env.HEADERS_X_XSS_PROTECTION || "1; mode=block",
      xco: process.env.HEADERS_X_CONTENT_TYPE_OPTIONS || "nosniff",
      ref: process.env.HEADERS_REFERRER_POLICY || "strict-origin-when-cross-origin"
    }
  },
  lockers: {
    salt: process.env.LOCKERS_SALT,
    table: {
      name: process.env.LOCKERS_TABLE_NAME || "Lockers"
    },
    entity: {
      signature: {
        id: null, // special locker uuid
        data: null, // user data
        requests: 1, // remaining requests
        ttl: 86400, // time to live
        createdAt: null,
        updatedAt: null,
        expiresAt: null,
        version: 1 // Adapt this if signature changes!
      },
      defaults: {
        requests: process.env.LOCKERS_DEFAULTS_REQUESTS || 1,
        ttl: process.env.LOCKERS_DEFAULTS_TTL || 86400,
      }
    },
  }
};