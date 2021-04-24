const DJPApi = require('djp-api');

const port = process.env.PORT || 3000;
const address = process.env.LISTEN_ADDRESS || '0.0.0.0';
const specificationFilePath = `${__dirname}/app/swagger.json`;
const service = require('./app/controllers');

const Server = new DJPApi({
  port,
  address,
  specificationFilePath,
  service,
  logger: DJPApi.PRESETS.logger[process.env.NODE_ENV || 'development'],
});
Server.start();
