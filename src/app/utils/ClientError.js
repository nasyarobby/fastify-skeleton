const ApiError = require('./ApiError');

class ClientError extends ApiError {
  constructor(message, config) {
    super(message);
    this.status = (config && config.status) || 'fail';
    this.code = (config && config.code) || 400;
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

module.exports = ClientError;
