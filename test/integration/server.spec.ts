// test/integration/server.spec.ts
import { expect, request, use as chaiUse } from 'chai';
import chaiHttp from 'chai-http';

import app from '@/app';

chaiUse(chaiHttp);

before((done) => {
  app.on('ready', () => {
    done();
  });
});

describe('Permission', () => {
  describe('Add', () => {
    it('should success add a new permission', async () => {
      const res = await request(app)
        .post('/permission')
        .set('content-type', 'application/json')
        .send({
          str: 'integration test permission str',
        });

      expect(res).to.have.status(200);
    });
  });
  describe('Get', () => {
    it('should success get permission added before with id 1', async () => {
      const res = await request(app)
        .get('/permission/1');
      expect(res).to.have.status(200);
    });
  });
});
