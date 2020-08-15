const request = require('supertest')
const db = require('../database/dbConfig');
const server = require('./server');

describe('testing endpoints', () => {
  describe('Post test to login and register', () => {
    beforeAll(async() => {
      await db('users').truncate();
    })
    it('Posts to /auth/register, should return 201', () => {
      return request(server)
      .post('/api/auth/register')
      .send({ username: 'ryan', password: 'heyheyhey' })
      .then(res => {
        expect(res.status).toBe(201);
      })
    })
    it('Posts to /auth/regist, should return json', () => {
      return request(server)
      .post('/api/auth/register')
      .send({username: 'frank', password: 'heyheyhey'})
      .then(res => {
        expect(res.type).toMatch(/json/i);
      })
    })
    it('Posts to /auth/login allows sign in, should return 200', () => {
      return request(server)
      .post('/api/auth/login')
      .send({username: 'ryan', password: 'heyheyhey'})
      .then(res => {
        expect(res.status).toBe(200);
      })
    })
    it('Posts to /auth/login returns json', () => {
      return request(server)
      .post('/api/auth/login')
      .send({username: 'ryan', password: 'heyheyhey'})
      .then(res => {
        expect(res.type).toMatch(/json/i);
      })
    })
    it('gets to /api/joke shoudl return json', () => {
      return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.type).toMatch(/json/i);
      })
    })
    it('gets to api/jokes/ to be defined', () => {
      return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.body).toBeDefined();
      })
    })
  })
})
