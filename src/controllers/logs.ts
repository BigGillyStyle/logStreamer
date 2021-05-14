import { Request, Response } from 'express';
import path from 'path';

import { HttpError } from '../errors/HttpException';

interface LogRequestQuery {
  filename: string;
  numEvents?: string;
  search?: string;
}

const rootLogDir = '/var/log/';

const validateRequest = (query: Record<string, unknown>): LogRequestQuery => {
  let filename = query.filename as string;

  if (!filename) {
    throw new HttpError(400, "'filename' query parameters is missing");
  }

  // https://nodejs.org/en/knowledge/file-system/security/introduction/#poison-null-bytes
  if (filename.indexOf('\0') !== -1) {
    throw new HttpError(400, "Invalid 'filename' query parameter");
  }

  // https://nodejs.org/en/knowledge/file-system/security/introduction/#preventing-directory-traversal
  filename = path.join(rootLogDir, filename);
  if (filename.indexOf(rootLogDir) !== 0) {
    throw new HttpError(400, "Invalid 'filename' query parameter");
  }

  return {
    filename,
    numEvents: query.numEvents as string,
    search: query.search as string,
  };
};

export const getLogs = (req: Request, res: Response): void => {
  const query = validateRequest(req.query);

  res.status(200).json({ status: 'ok' });
};
