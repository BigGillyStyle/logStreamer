import { createHttpTerminator, HttpTerminator } from 'http-terminator';

import { app } from './app';
import { logger } from './services/logger';

const server = app.listen(3000, () => {
  logger.info(`Express server started on port: 3000`);
});

const httpTerminator: HttpTerminator = createHttpTerminator({ server });

async function shutdown() {
  logger.info('Terminating HTTP connections to server: start');
  await httpTerminator.terminate(); // stop receiving requests, wait for current requests to finish
  logger.info('Terminating HTTP connections to server: complete');
  server.close(() => {
    logger.info('Server shutdown complete');
    process.exit(0);
  });
}

process.on('SIGINT', async () => {
  logger.info('Received SIGINT signal for graceful shutdown');
  await shutdown();
});

process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM signal for graceful shutdown');
  await shutdown();
});
