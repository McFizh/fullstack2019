const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce( (prev,cur) => prev + cur.likes, 0 );
};

const favoriteBlog = (blogs) => {
  let mostLikes = { likes: -1 };
  for(let blog of blogs) {
    if(blog.likes >= mostLikes.likes) {
      mostLikes = blog;
    }
  }

  return mostLikes;
};

const mostBlogs = (blogs) => {
  return _(blogs)
    .countBy('author')
    .map( (val,idx) => ({ 'author': idx, 'blogs': val }) )
    .maxBy( o => o.blogs );
};

const mostLikes = (blogs) => {
  console.log(
    _(blogs).groupBy('author')
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};