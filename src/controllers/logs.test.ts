import request from 'supertest';

import { app } from '../app';

// These tests are obviously not very comprehensive but for now serve to demonstrate a
// typical integration test for the endpoint
describe('/logs', () => {
  describe('error scenarios', () => {
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

    it('should return an error message when the filename does not exist', async () => {
      const { body, status } = await request(app).get(
        `/logs?filename=rfc5424.log&numEvents=A`
      );

      expect(status).toEqual(400);
      expect(body.message).toEqual("Invalid 'numEvents' query parameter");
    });
  });

  describe('success scenarios', () => {
    it('should return the entire log file when the filename is valid and no other query params are provided', async () => {
      const { status, text } = await request(app).get(
        `/logs?filename=rfc5424.log`
      );
      const lines = text.split('\n').length;

      expect(status).toEqual(200);
      expect(lines).toEqual(1001);
    });

    it('should return the expected number of lines file when the filename is valid and a "numEvents" param is supplied', async () => {
      const numEvents = 4;
      const { status, text } = await request(app).get(
        `/logs?filename=rfc5424.log&numEvents=${numEvents}`
      );
      const lines = text.split('\n').length;

      expect(status).toEqual(200);
      expect(lines).toEqual(numEvents + 1); // account for empty line in response
    });

    it('should return the expected number of lines file when the filename is valid and a "search" param is supplied', async () => {
      const { status, text } = await request(app).get(
        `/logs?filename=rfc5424.log&search=bluetooth`
      );
      const lines = text.split('\n').length;

      expect(status).toEqual(200);
      expect(lines).toEqual(53); // account for empty line in response
    });
  });
});
