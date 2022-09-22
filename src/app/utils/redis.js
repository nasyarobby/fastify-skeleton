const Redis = require('ioredis');

function parseRedisSentinel(str) {
  return str
    .split(',')
    .map((sentinelString) => sentinelString.trim())
    .map((sentinelString) => sentinelString.split(':'))
    .map(([host, port]) => ({ host, port: port || 26379 }));
}

const REDIS_SENTINEL = process.env.REDIS_SENTINEL || false;
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const { REDIS_PASS } = process.env;
const REDIS_DB = process.env.REDIS_DB || 0;

const config = { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASS, db: REDIS_DB };
const sentinels = REDIS_SENTINEL ? parseRedisSentinel(REDIS_SENTINEL) : [];
const redis = REDIS_SENTINEL
  ? new Redis({
      sentinels,
      name: process.env.REDIS_SENTINEL_MASTER,
      password: REDIS_PASS,
      db: REDIS_DB,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    })
  : new Redis(config);

redis.on('ready', () => {
  // eslint-disable-next-line
  console.log('Redis is ready.');
  if (REDIS_SENTINEL) {
    // eslint-disable-next-line
    console.table(sentinels)
  }
});

redis.on('error', (error) => {
  // eslint-disable-next-line
  console.error(error);
});

module.exports = redis;
module.exports.createClientSentinel = () =>
  new Redis({
    sentinels,
    name: process.env.REDIS_SENTINEL_MASTER,
    password: REDIS_PASS,
    db: REDIS_DB,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  });
