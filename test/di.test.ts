'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('di normal', () => {
  let app: any;
  before(() => {
    app = mm.app({
      baseDir: 'di',
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mm.restore);

  it('normal lazyInject', () => {
    return request(app.callback())
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });
  afterEach(mm.restore);

  it('normal inject', () => {
    return request(app.callback())
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });

  it('without typescript metadata gen', () => {
    return request(app.callback())
      .get('/notype')
      .expect('hi, egg')
      .expect(200);
  });

  it('get component by method', () => {
    return request(app.callback())
      .get('/service')
      .expect('hi, service')
      .expect(200);
  });

  it('get component by method', async () => {
    await request(app.callback())
      .get('/appcount')
      .expect('0')
      .expect(200);

    return request(app.callback())
      .get('/appcount')
      .expect('1')
      .expect(200);
  });
});