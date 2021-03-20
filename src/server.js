const DJPApi = require('djp-api');

const port = process.env.PORT || 3000;
const address = process.env.LISTEN_ADDRESS || '0.0.0.0';
const specificationFilePath = `${__dirname}/app/swagger.json`;
const service = require('./app/services');

const app = new DJPApi({ port, address, specificationFilePath, service });
app.start();
