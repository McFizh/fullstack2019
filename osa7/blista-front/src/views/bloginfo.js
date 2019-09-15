import React from 'react';
import { connect } from 'react-redux';

import Heading from 'react-bulma-components/lib/components/heading';

import  { useField } from '../hooks';
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer';

const Bloginfo = (props) => {
  const [ comment, resetComment ] = useField('text');


  if(!props.blog) {
    return null;
  }

  const likeBlog = (e) => {
    e.preventDefault();
    props.likeBlog(props.blog);
  };

  const addComment = (e) => {
    e.preventDefault();
    props.commentBlog(props.blog, comment.value);
    resetComment();
  };

  const removeBlog = (e) => {
    e.preventDefault();
    if(window.confirm('Do you want to remove blog?')) {
      props.removeBlog(props.blog);
    }
  };

  let removeButton = '';
  if(props.blog.user.username === props.user.username) {
    removeButton = <button className="button is-danger" onClick={removeBlog}>Remove</button>;
  }

  let comments = null;
  if(props.blog.comments && props.blog.comments.length>0) {
    comments = <p>
      { props.blog.comments.map( (comment, idx) => <div key={`comment_${idx}`}>
        &raquo; {comment}
      </div>) }
      <br/>
    </p>;
  }

  return (
    <div>
      <Heading>{props.blog.title}</Heading>
      <a href={props.blog.url} target='_blank' rel='noreferrer noopener'>{props.blog.url}</a><br/>
      {props.blog.author}<br/>
      <div className="blogLikeSection">
        {props.blog.likes} likes <button className="button is-primary" onClick={likeBlog}>Like</button><br/>
      </div>
      Added by: {props.blog.user.name}<br/>
      {removeButton}<br/>
      <Heading>Comments:</Heading>
      {comments}
      <div className="commentBox">
        <input className="input" placeholder="Comment..." {...comment}/>
        <button onClick={addComment} className="button is-info">Add comment</button>
      </div>
    </div>
  );
};

export default connect(
  null, {
    likeBlog,
    removeBlog,
    commentBlog
  }
)(Bloginfo);
