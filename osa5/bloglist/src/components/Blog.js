import React, { useState } from 'react';
import './Blog.css';

const Blog = ({ blog, likeAction, removeAction, user }) => {
  const [ open, setOpen ] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const likeBlog = (e) => {
    e.preventDefault();
    likeAction(blog);
  };

  const removeBlog = (e) => {
    e.preventDefault();
    removeAction(blog);
  };

  if(!open) {
    return (
      <div className='blog'>
        <span onClick={toggleOpen}>{blog.title} {blog.author}</span>
      </div>
    );
  }

  let removeButton = '';
  if(blog.user.username === user.username) {
    removeButton = <button onClick={removeBlog}>Remove</button>;
  }

  return (
    <div className='blog'>
      <span onClick={toggleOpen}>{blog.title} {blog.author}</span><br/>
      <a href={blog.url} target='_blank' rel='noreferrer noopener'>{blog.url}</a><br/>
      {blog.likes} likes <button onClick={likeBlog}>Like</button><br/>
      Added by: {blog.user.name}<br/>
      {removeButton}
    </div>
  );

};

export default Blog;