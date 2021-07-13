const DJPApi = require('djp-api');
const { PORT, LOG_LEVEL, NODE_ENV } = require('./config');

const address = process.env.LISTEN_ADDRESS || '0.0.0.0';
const specificationFilePath = `${__dirname}/app/swagger.json`;
const service = require('./app/controllers');

const Server = new DJPApi({
  PORT,
  address,
  specificationFilePath,
  service,
  fastifyConfig: {
    logger: {
      level: LOG_LEVEL,
      prettyPrint: NODE_ENV === 'production' ? false : { translateTime: 'SYS:yy-mm-dd HH:MM:ss o' },
    },
  },
});
Server.start();
