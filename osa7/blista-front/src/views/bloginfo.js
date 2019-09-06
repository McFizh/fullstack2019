import React from 'react';
import { connect } from 'react-redux';

import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Bloginfo = (props) => {
  if(!props.blog) {
    return null;
  }

  const likeBlog = (e) => {
    e.preventDefault();
    props.likeBlog(props.blog);
  };

  const removeBlog = (e) => {
    e.preventDefault();
    if(window.confirm('Do you want to remove blog?')) {
      props.removeBlog(props.blog);
    }
  };

  let removeButton = '';
  if(props.blog.user.username === props.user.username) {
    removeButton = <button onClick={removeBlog}>Remove</button>;
  }

  return (
    <div>
      <h1>{props.blog.title}</h1>
      <a href={props.blog.url} target='_blank' rel='noreferrer noopener'>{props.blog.url}</a><br/>
      {props.blog.likes} likes <button onClick={likeBlog}>Like</button><br/>
      Added by: {props.blog.user.name}<br/>
      {removeButton}
    </div>
  );
};

export default connect(
  null, {
    likeBlog,
    removeBlog
  }
)(Bloginfo);
