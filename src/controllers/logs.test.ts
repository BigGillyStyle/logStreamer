import request from 'supertest';

import { app } from '../app';

describe('/logs', () => {
  it('should return a pong message from the ping service', async () => {
    const { body, status } = await request(app).get(`/logs`);

    expect(body.status).toEqual('ok');
    expect(status).toEqual(200);
  });
});
