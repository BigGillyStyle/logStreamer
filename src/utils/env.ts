import { NodeEnv } from '../types/NodeEnv';

export const isProd = (): boolean => process.env.NODE_ENV === NodeEnv.PROD;
