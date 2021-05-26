import { NextFunction, Request, Response } from 'express';
import * as stream from 'stream';

import { HttpError } from '../errors/HttpException';
import { logger } from '../services/logger';
import { createLogStreams } from '../services/streamLogs';
import { registerStreamEvents } from '../utils/streamEventHandlers';
import { validateGetLogsRequest } from '../validators/validateGetLogsRequest';

export const getLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = await validateGetLogsRequest(req.query);

    const streams = createLogStreams(query);
    streams.forEach((s) => registerStreamEvents(s));

    const pipelineStream = stream.pipeline(...streams, res, (err) => {
      if (err) {
        logger.error(err);
        throw new HttpError(500, 'There was an error processing your request');
      }
    });
    const cleanup = stream.finished(pipelineStream, (err) => {
      if (err) {
        logger.error(err, 'Error in pipeline stream');
      } else {
        logger.debug('Pipeline stream finished normally');
      }
      cleanup();
      logger.debug(
        `Source stream ${streams[1].destroyed ? 'is' : 'is not'} destroyed`
      );
    });
  } catch (err) {
    next(err);
  }
};
