import { Transform, TransformCallback } from 'stream';
import { LogRequestQuery } from '../types/LogRequestQuery';

export class FilterStream extends Transform {
  constructor(private readonly filterText: LogRequestQuery['search']) {
    super();
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(
    chunk: string,
    _encoding: BufferEncoding,
    next: TransformCallback
  ): void {
    // case-sensitive match
    if (!this.filterText || chunk.includes(this.filterText)) {
      next(null, chunk);
    } else {
      next();
    }
  }
}
