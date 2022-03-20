const request = require('supertest');

const app = require('../app');
const User = require('../models/User');

describe('Create Authentication API End to End', () => {
  describe('Test index', () => {
    test('GET /', async () => {
      const response = await request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        description: 'Authentication Sample',
        name: 'authentication-js',
        version: '1.0.0',
      });
    });
  });

  describe('Test auth', () => {
    beforeAll(async () => {
      await User.create('john.doe@localhost', 'secret');
    });

    test('POST /login', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'john.doe@localhost', password: 'secret' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    test('POST /login (invalid)', async () => {
      await User.create('john.doe@localhost', 'secret');
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'john.doe@localhost', password: 'wrong-password' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toBeDefined();
    });
  });
});
