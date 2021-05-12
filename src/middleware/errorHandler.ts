import { NextFunction, Request, Response } from 'express';
import { logger } from '../services/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err);
  res.status(500).json({ error: err.message });
};