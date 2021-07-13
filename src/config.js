const {
  NODE_ENV = 'production',
  LOG_LEVEL = 'info',
  PORT = 3000,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_SENTINEL,
  REDIS_SENTINEL_MASTER,
} = process.env;

const config = {
  NODE_ENV,
  PORT,
  LOG_LEVEL,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_SENTINEL,
  REDIS_SENTINEL_MASTER,
};

const requiredEnvVars = [];

const missingEnvVars = [];
requiredEnvVars.forEach((env) => {
  if (config[env] === undefined) missingEnvVars.push(env);
});
if (missingEnvVars.length) {
  throw new Error(
    `\nMissing environment variables:\n${missingEnvVars
      .map((varName, index) => `${index + 1}. ${varName}`)
      .join('\n')}`
  );
}

const redacted = ['REDIS_PASS'];

// eslint-disable-next-line
console.log(`=== CONFIG ==========`);
// eslint-disable-next-line
console.log({
  ...config,
  ...redacted.reduce((prev, key) => ({ ...prev, [key]: config[key] && '******' }), {}),
});

module.exports = config;
