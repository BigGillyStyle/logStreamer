import { Transform, TransformCallback } from 'stream';

export const createAddNewLineStream = (): Transform =>
  new Transform({
    writableObjectMode: true,

    transform(
      chunk: string,
      _encoding: BufferEncoding,
      next: TransformCallback
    ) {
      next(null, `${chunk}\n`);
    },
  });
