import React, { useRef } from 'react';
import { connect } from 'react-redux';

import Heading from 'react-bulma-components/lib/components/heading';

import Blog from '../components/Blog';
import NewBlog from '../components/NewBlog';
import Togglable from '../components/Togglable';

import  { useField } from '../hooks';

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

  return (
    <div>
      <Heading>List of blogs</Heading>
      { props.blogs.map( blog => <Blog key={blog.id} blog={blog}/> ) }
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