import { Readable, Transform } from 'stream';
import { createAddNewLineStream } from '../streams/AddNewLineStream';
import { createReverseReadStream } from '../streams/createReverseReadStream';
import { FilterStream } from '../streams/FilterStream';
import { LineLimitStream } from '../streams/LineLimitStream';
import { LogRequestQuery } from '../types/LogRequestQuery';

export const createLogStreams = (
  query: LogRequestQuery
): [Readable, FilterStream, LineLimitStream, Transform] => {
  const sourceStream = createReverseReadStream(query.filename);
  return [
    sourceStream,
    new FilterStream(query.search),
    new LineLimitStream(query.numEvents, sourceStream),
    createAddNewLineStream(),
  ];
};
