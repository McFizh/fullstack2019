const Mongoose = require('mongoose');
const Supertest = require('supertest');
const App = require('../app');
const User = require('../models/user');

const Api = Supertest(App);

beforeEach(async () => {
  await User.deleteMany({});
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
test('creating and listing user works', async () => {
  // Luodaan käyttäjä ja listataan käyttäjät (4.15)
  await Api
    .post('/api/users')
    .send({ username: 'testi', name: 'Teppo testaaja', password: 'testi' })
    .expect(201);
  const rsp = await Api
    .get('/api/users')
    .expect(200);

  expect(rsp.body.length).toBe(1);

  // Yritetään luoda käyttäjä ilman tunnusta / salasanaa + duplikaattitunnus (4.16)
  const res1 = await Api
    .post('/api/users')
    .send({ name: 'Teppo testaaja', password: 'testi' })
    .expect(400);
  expect(res1.body.error).toContain('User validation failed');

  const res2 = await Api
    .post('/api/users')
    .send({ username: 'testi2', name: 'Teppo testaaja' })
    .expect(400);
  expect(res2.body.error).toContain('password missing or shorter');

  const res3 = await Api
    .post('/api/users')
    .send({ username: 'testi', name: 'Teppo testaaja', password: 'testi' })
    .expect(400);
  expect(res3.body.error).toContain('User validation failed');
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
afterAll(() => {
  Mongoose.connection.close();
});