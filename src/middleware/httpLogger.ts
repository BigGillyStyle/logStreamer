import { NextFunction, Request, Response } from 'express';
import PinoHttp from 'pino-http';
import { logger } from '../services/logger';

const pinoHttpLogger = PinoHttp({ logger, useLevel: 'info' });

export const httpLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  pinoHttpLogger(req, res);
  next();
};
