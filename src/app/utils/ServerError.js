const ApiError = require('./ApiError');

class ServerError extends ApiError {
  constructor(message, config) {
    super(message);
    this.status = (config && config.status) || 'error';
    this.code = (config && config.code) || 500;
    this.data = (config && config.data) || null;
    this.error =
      (config &&
        config.error && {
          name: config.error.name,
          message: config.error.message,
          stack: config.error.stack,
        }) ||
      undefined;
  }
}

module.exports = ServerError;
