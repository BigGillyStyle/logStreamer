import { Readable, Transform, TransformCallback } from 'stream';
import { LogRequestQuery } from '../types/LogRequestQuery';

export class LineLimitStream extends Transform {
  private lineCount = 0;

  constructor(
    private readonly maxLines: LogRequestQuery['numEvents'],
    private readonly sourceStream: Readable
  ) {
    super();
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(
    chunk: string,
    _encoding: BufferEncoding,
    next: TransformCallback
  ): void {
    this.lineCount += 1;
    if (!this.maxLines || this.lineCount <= this.maxLines) {
      next(null, chunk);
    } else {
      this.sourceStream.destroy();
      next();
    }
  }
}
