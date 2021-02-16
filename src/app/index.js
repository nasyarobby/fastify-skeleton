const Fastify = require('fastify');
const openapiGlue = require('fastify-openapi-glue');
const { format } = require('./services/response');
const { status } = require('./services/status');
const service = require('./routes/index.js');

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
    reply.status(200).send(format(request, reply, status.FAIL, 422, message));
  }
});

module.exports = app;
