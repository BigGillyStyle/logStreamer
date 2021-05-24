import { NextFunction, Request, Response } from 'express';
import { pipeline } from 'stream';

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
    streams.forEach((stream) => registerStreamEvents(stream));

    pipeline(...streams, res, (err) => {
      if (err) {
        logger.error(err);
        throw new HttpError(500, 'There was an error processing your request');
      }
    });
  } catch (err) {
    next(err);
  }
};
