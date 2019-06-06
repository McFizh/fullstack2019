const listHelper = require('../utils/list_helper');
const MockData = require('./moc_blog_data');

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(MockData.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(MockData.listWithMultipleblogs);
    expect(result).toBe(36);
  });
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
describe('favorite blog', () => {
  test('list with one item, returns the item', () => {
    const result = listHelper.favoriteBlog(MockData.listWithOneBlog);
    expect(result.title).toBe('Go To Statement Considered Harmful');
  });

  test('list with multiple items, returns correct item', () => {
    const result = listHelper.favoriteBlog(MockData.listWithMultipleblogs);
    expect(result.title).toBe('Canonical string reduction');
  });

});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
describe('most blogs', () => {
  const correctResult = {
    author: 'Robert C. Martin',
    blogs: 3
  };

  test('list with multiple items, returns correct value', () => {
    const result = listHelper.mostBlogs(MockData.listWithMultipleblogs);
    expect(result).toEqual(correctResult);
  });
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
describe('most likes', () => {
  const correctResult = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  };

  test('list with multiple items, returns correct value', () => {
    const result = listHelper.mostLikes(MockData.listWithMultipleblogs);
    expect(result).toEqual(correctResult);
  });
});