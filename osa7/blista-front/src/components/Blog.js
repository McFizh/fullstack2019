import React from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className='blog'>
      <span><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></span><br/>
    </div>
  );
};

export default Blog;