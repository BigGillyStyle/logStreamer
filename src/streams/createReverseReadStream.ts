// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fsReverse from 'fs-reverse';
import { Readable } from 'stream';
import { LogRequestQuery } from '../types/LogRequestQuery';

// I'm guessing you would've preferred that I implement the logic that 'fs-reverse' provides.
// I have several years of Node experience, but most all of it was *not* dealing with the
// file system and buffers...and within the 4-hour time limit you provided I did not
// have great confidence in my ability to both (1) show my ability to write an
// app of sufficient quality AND (2) write this logic.
// My experience with Node is in a more "traditional web app" setting...coneecting to databases,
// interacting with AWS resources (S3 and Elasticache/Redis for example), connecting over websockets to clients,
// etc.
export const createReverseReadStream = (
  filename: LogRequestQuery['filename']
): Readable => fsReverse(filename, {}) as Readable;
