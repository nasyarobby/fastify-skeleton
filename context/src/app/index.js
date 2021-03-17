const Fastify = require('fastify');
const openapiGlue = require('fastify-openapi-glue');
const { send } = require('./services/response');
const { status } = require('./services/status');
const service = require('./routes/index.js');
const { ClientError, ServerError } = require('./utils/errors');

const specification = `${__dirname}/swagger.json`;
const app = Fastify({
  logger: { prettyPrint: true },
  pluginTimeout: 10000,
});

const swaggerServers = [{ url: `http://localhost:${process.env.PORT || 3000}` }];
if (process.env.SWAGGER_HOSTS) {
  process.env.SWAGGER_HOSTS.split(',').forEach((host) => swaggerServers.push({ url: host }));
}

const swaggerOptions = {
  mode: 'static',
  specification: {
    path: specification,
    postProcessor: (swaggerObject) => {
      const swagger = {
        ...swaggerObject,
        servers: swaggerServers,
      };
      return swagger;
    },
  },
  exposeRoute: true,
};

app.register(require('fastify-swagger'), swaggerOptions);

const glueOptions = {
  specification,
  noAdditional: true,
  service,
};
app.register(openapiGlue, glueOptions);

app.setErrorHandler((error, request, reply) => {
  if (error.validation && error.validation.length > 0) {
    const path = error.validation[0].dataPath;
    const field = path.charAt(1).toUpperCase() + path.slice(2);
    const message = `${field} ${error.validation[0].message}`;
    // reply.status(422).send(format(request, reply, message));
    send(request, reply, status.FAIL, 400, 'Login gagal!', message);
  } else if (error instanceof ClientError || error instanceof ServerError) {
    send(
      request,
      reply,
      error.status,
      error.code,
      error.message,
      process.env.NODE_ENV === 'production' ? error.data : { ...error.data, stack: error.stack }
    );
  }

  // Unhandled error
  // Jika production log error ke console
  // jika tidak, error akan dimasukkan ke RESPONSE
  // TODO: proses pengecekan production atau bukan sebaiknya dipindah ke fungsi tersendiri
  if (process.env.NODE_ENV !== 'production') app.log.error(error);
  send(
    request,
    reply,
    status.ERROR,
    500,
    'Internal server error',
    process.env.NODE_ENV !== 'production'
      ? { ...error.data, stack: error.stack, error: error.error }
      : error.data
  );
});

module.exports = app;
