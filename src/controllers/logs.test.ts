import request from 'supertest';

import { app } from '../app';

describe('/logs', () => {
  it("should return an 'ok' message when valid query params are provided", async () => {
    const { body, status } = await request(app).get(
      `/logs?filename=my.log&numEvents=2&search=text`
    );

    expect(status).toEqual(200);
    expect(body.status).toEqual('ok');
  });

  it("should return an 'ok' message when valid query params are provided and optional params are omitted", async () => {
    const { body, status } = await request(app).get(`/logs?filename=my.log`);

    expect(status).toEqual(200);
    expect(body.status).toEqual('ok');
  });

  it('should return an error message when the filename attempts to traverse directories', async () => {
    const { body, status } = await request(app).get(`/logs?filename=../my.log`);

    expect(status).toEqual(400);
    expect(body.message).toEqual("Invalid 'filename' query parameter");
  });

  it('should return an error message when the filename does not exist', async () => {
    const { body, status } = await request(app).get(`/logs`);

    expect(status).toEqual(400);
    expect(body.message).toEqual("'filename' query parameters is missing");
  });
});
