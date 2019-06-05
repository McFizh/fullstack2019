const Mongoose = require('mongoose');
const Supertest = require('supertest');
const App = require('../app');
const Blog = require('../models/blog');
const MockData = require('./moc_data');

const Api = Supertest(App);

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
test('notes are returned as json', async () => {
  const response = await Api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body.length).toBe(MockData.listWithMultipleblogs.length);

  // 4.9
  expect(response.body[0].id).toBeDefined();
});

test('adding note works', async () => {
  // 4.10
  await Api
    .post('/api/blogs')
    .send({ title: 'title', author: 'author', url: 'http://www.google.fi' });
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

afterAll(() => {
  Mongoose.connection.close();
});