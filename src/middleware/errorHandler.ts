import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpException';
import { logger } from '../services/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err);

  const status = err instanceof HttpError ? err.status : 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ message });
};
