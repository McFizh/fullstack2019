import React, { useRef } from 'react';
import { connect } from 'react-redux';

import Blog from '../components/Blog';
import NewBlog from '../components/NewBlog';
import Togglable from '../components/Togglable';

import  { useField } from '../hooks';

import BlogService from '../services/blogs';
import { createBlog, fetchBlogs } from '../reducers/blogReducer';

const Bloglist = (props) => {
  const [ blogTitle, resetTitle ] = useField('text');
  const [ blogAuthor, resetAuthor ] = useField('text');
  const [ blogUrl, resetUrl ] = useField('text');

  const blogFormRef = useRef();

  const resetCallbacks = {
    resetTitle,
    resetAuthor,
    resetUrl,
    hideBlogForm: () => { blogFormRef.current.toggleVisibility(); }
  };

  const createBlogEvent = (e) => {
    e.preventDefault();
    props.createBlog({
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value,
      resetCallbacks
    });
  };

  const likeAction = async ( blog ) => {
    try {
      await BlogService.likeAction(blog.id, blog.likes+1);
      props.fetchBlogs();
    } catch(err) {
      console.log(err);
    }
  };

  const removeAction = async ( blog ) => {
    try {
      if(window.confirm('Do you want to remove blog?')) {
        await BlogService.remove(blog.id);
        props.fetchBlogs();
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>blogs</h1>
      { props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeAction={likeAction} removeAction={removeAction} user={props.user}/>
      ) }
      <br/>
      <Togglable buttonLabel='Create blog' ref={blogFormRef}>
        <NewBlog
          blogTitle={blogTitle} blogAuthor={blogAuthor} blogUrl={blogUrl}
          createBlog={ createBlogEvent }
        />
      </Togglable>
    </div>
  );
};

export default connect(
  null, {
    createBlog,
    fetchBlogs,
  }
)(Bloglist);