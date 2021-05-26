import path from 'path';
import { promises as fsPromises } from 'fs';

import { HttpError } from '../errors/HttpException';
import { logger } from '../services/logger';
import { LogRequestQuery } from '../types/LogRequestQuery';

const rootLogDir = process.env.LOG_DIR as string;

export const validateGetLogsRequest = async (
  query: Record<string, unknown>
): Promise<LogRequestQuery> => {
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

  try {
    await fsPromises.stat(filename);
  } catch (err) {
    logger.error(err);
    throw new HttpError(400, "Invalid 'filename' query parameter");
  }

  const numEvents: LogRequestQuery['numEvents'] = parseInt(
    query.numEvents as string,
    10
  );
  if (typeof query.numEvents !== 'undefined' && Number.isNaN(numEvents)) {
    throw new HttpError(400, "Invalid 'numEvents' query parameter");
  }

  return {
    filename,
    numEvents,
    search: query.search as string,
  };
};
