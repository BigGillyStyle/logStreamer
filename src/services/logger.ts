import pino from 'pino';

const isLocal = ['development', 'test'].includes(
  process.env.NODE_ENV as string
);

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: isLocal,
  redact: isLocal ? ['req.headers', 'res.headers'] : [],
});
