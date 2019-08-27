import React from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className='blog'>
      <span><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></span><br/>
    </div>
  );

  /*
  const likeBlog = (e) => {
    e.preventDefault();
    likeAction(blog);
  };

  const removeBlog = (e) => {
    e.preventDefault();
    removeAction(blog);
  };
  let removeButton = '';
  if(blog.user.username === user.username) {
    removeButton = <button onClick={removeBlog}>Remove</button>;
  }

  <a href={blog.url} target='_blank' rel='noreferrer noopener'>{blog.url}</a><br/>
      {blog.likes} likes <button onClick={likeBlog}>Like</button><br/>
      Added by: {blog.user.name}<br/>
      {removeButton}
  */

};

export default Blog;