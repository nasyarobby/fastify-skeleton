const app = require('./app');

const port = process.env.PORT || 3000;
const address = process.env.LISTEN_ADDRESS || '0.0.0.0';

app.listen(port, address, (err, listening) => {
  app.log.info(`Server is running at ${listening}`);

  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

process
  .on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.error('Unhandled Rejection', reason, p);
  })
  .on('uncaughtException', (er) => {
    // eslint-disable-next-line no-console
    console.error('Terminating process', er.stack);
    process.exit(1);
  });
