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
  expect(response.body.length).toBe(6);
});

afterAll(() => {
  Mongoose.connection.close();
});