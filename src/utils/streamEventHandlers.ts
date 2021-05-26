import Stream, { Readable, Writable, Transform } from 'stream';

import { logger } from '../services/logger';
import { isProd } from './env';

const streamName = (stream: Stream): string => stream.constructor.name;

const registerReadableStreamEvents = (stream: Readable): void => {
  stream.on('close', () =>
    logger.debug(`${streamName(stream)} "close" event received`)
  );
  stream.on('error', (err) =>
    logger.error(err, `${streamName(stream)} "error" event received`)
  );
  stream.on('end', () =>
    logger.debug(`${streamName(stream)} "end" event received`)
  );
};

const registerWriteableStreamEvents = (stream: Writable): void => {
  stream.on('close', () =>
    logger.debug(`${streamName(stream)} "close" event received`)
  );
  stream.on('error', (err) =>
    logger.error(err, `${streamName(stream)} "error" event received`)
  );
  stream.on('finish', () =>
    logger.debug(`${streamName(stream)} "finish" event received`)
  );
};

const registerTransformStreamEvents = (stream: Transform): void => {
  stream.on('close', () =>
    logger.debug(`${streamName(stream)} "close" event received`)
  );
  stream.on('error', (err) =>
    logger.error(err, `${streamName(stream)} "error" event received`)
  );
  stream.on('end', () => {
    logger.debug(`${streamName(stream)} "end" event received`);
  });
  stream.on('finish', () =>
    logger.debug(`${streamName(stream)} "finish" event received`)
  );
};

export const registerStreamEvents = (stream: Stream): void => {
  // don't even register stream event handlers in deployed environments
  if (!isProd()) {
    if (stream instanceof Transform) {
      registerTransformStreamEvents(stream);
    } else if (stream instanceof Writable) {
      registerWriteableStreamEvents(stream);
    } else if (stream instanceof Readable) {
      registerReadableStreamEvents(stream);
    }
  }
};
