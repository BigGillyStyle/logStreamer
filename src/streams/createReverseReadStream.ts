// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fsReverse from 'fs-reverse';
import { Readable } from 'stream';
import { LogRequestQuery } from '../types/LogRequestQuery';

export const createReverseReadStream = (
  filename: LogRequestQuery['filename']
): Readable => fsReverse(filename, {}) as Readable;
