import express from 'express';
import 'dotenv/config';

import { httpLogger } from './middleware/httpLogger';
import { errorHandler } from './middleware/errorHandler';
import { getLogs } from './controllers/logs';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
app.get('/logs', getLogs);
app.use(errorHandler);
