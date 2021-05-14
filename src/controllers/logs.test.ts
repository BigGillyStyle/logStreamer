import request from 'supertest';

import { app } from '../app';

// These tests are obviously not very comprehensive but for now serve to demonstrate a
// typical integration test for the endpoint
describe('/logs', () => {
  it('should return an error message when the filename attempts to traverse directories', async () => {
    const { body, status } = await request(app).get(
      `/logs?filename=../../etc/passwd`
    );

    expect(status).toEqual(400);
    expect(body.message).toEqual("Invalid 'filename' query parameter");
  });

  it('should return an error message when the filename does not exist', async () => {
    const { body, status } = await request(app).get(`/logs`);

    expect(status).toEqual(400);
    expect(body.message).toEqual("'filename' query parameters is missing");
  });
});
