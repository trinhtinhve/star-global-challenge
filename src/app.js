require('dotenv').config();

const http = require('http');
const util = require('util');
const logger = require('./common/logger');
const middleware = require('./middleware');
const {
  ensureConnected: postgreEnsureConnected,
  sequelize,
} = require('./core/star_global_challenge/models');

process.on('uncaughtException', (e) => {
  logger.error(`Exiting due to unhandled exception: ${util.inspect(e)}`);

  sequelize.close();
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `Exiting due to unhandled rejection: ${util.inspect(reason)} ${util.inspect(
      promise
    )}`
  );

  sequelize.close();
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, exiting...');

  sequelize.close();
  process.exit(1);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, exiting...');

  sequelize.close();
  process.exit(1);
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger.info('Listening on ' + bind);
}

function onClose() {
  logger.info(`app is now closing on port ${port}`);
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '4000');
const server = http.createServer(middleware);

server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);

postgreEnsureConnected()
  .then(() => server.listen(port))
  .catch((err) => {
    logger.error('Application can not start with error: ' + util.inspect(err));
  });
