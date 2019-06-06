const Mongoose = require('mongoose');
const Supertest = require('supertest');
const App = require('../app');
const Blog = require('../models/blog');
const MockData = require('./moc_blog_data');

const Api = Supertest(App);
let testUser = null;

beforeAll( async () => {
  testUser = ( await Api
    .post('/api/users')
    .send({ username: 'apitest', name: 'Teppo testaaja', password: 'apitest' }) ).body;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  let promiseList = [];

  MockData.listWithMultipleblogs.forEach( blogData => {
    const blog = new Blog( blogData );
    promiseList.push( blog.save() );
  });

  await Promise.all(promiseList);
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
test('blogs are returned as json', async () => {
  const response = await Api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body.length).toBe(MockData.listWithMultipleblogs.length);

  // 4.9
  expect(response.body[0].id).toBeDefined();
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
test('adding blog works', async () => {
  // 4.10
  await Api
    .post('/api/blogs')
    .send({ title: 'title', author: 'author', url: 'http://www.google.fi' })
    .expect(201);
  const rsp2 = await Api
    .get('/api/blogs')
    .expect(200);
  expect(rsp2.body.length).toBe(MockData.listWithMultipleblogs.length+1);
  const note = rsp2.body[6];
  expect(note.title).toBe('title');

  // 4.11
  expect(note.likes).toBeDefined();
  expect(note.likes).toBe(0);

  // 4.12
  await Api
    .post('/api/blogs')
    .send({ author: 'author', url: 'http://www.google.fi' })
    .expect(400);
  await Api
    .post('/api/blogs')
    .send({ title: 'title', author: 'author' })
    .expect(400);
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
test('removing and updating blog works', async () => {
  const rsp1 = await Api
    .get('/api/blogs')
    .expect(200);

  // 4.13
  await Api
    .del('/api/blogs/'+rsp1.body[0].id)
    .expect(204);
  const rsp2 = await Api
    .get('/api/blogs')
    .expect(200);
  expect(rsp2.body.length).toBe(MockData.listWithMultipleblogs.length-1);

  // 4.14
  await Api
    .put('/api/blogs/'+rsp1.body[1].id)
    .send({ likes: 20 })
    .expect(200);
  const rsp3 = await Api
    .get('/api/blogs')
    .expect(200);
  expect(rsp3.body[0].likes).toBe(20);
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
afterAll(() => {
  Mongoose.connection.close();
});