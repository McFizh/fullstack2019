import React, { useRef, useEffect } from 'react';
import  { useField } from './hooks';
import { connect } from 'react-redux';

import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';

import BlogService from './services/blogs';
import Togglable from './components/Togglable';

import { setNotification } from './reducers/notificationReducer';
import { createBlog, fetchBlogs } from './reducers/blogReducer';
import { doLogin, doLogout, setUserData } from './reducers/userReducer';

const App = (props) => {
  const [ blogTitle, resetTitle ] = useField('text');
  const [ blogAuthor, resetAuthor ] = useField('text');
  const [ blogUrl, resetUrl ] = useField('text');

  const [ username, resetUsername ] = useField('text');
  const [ password, resetPassword ] = useField('password');

  const blogFormRef = useRef();

  const resetCallbacks = {
    resetTitle,
    resetAuthor,
    resetUrl,
    resetUsername,
    resetPassword,
    hideBlogForm: () => { blogFormRef.current.toggleVisibility(); }
  };

  const loginEvent = (e) => {
    e.preventDefault();
    props.doLogin({
      username: username.value,
      password: password.value,
      resetCallbacks
    });
  };

  const logoutEvent = (e) => {
    e.preventDefault();
    props.doLogout();
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

  useEffect( () => {
    const appUser = window.localStorage.getItem('appUser');
    if(appUser) {
      props.setUserData(JSON.parse(appUser));
    }
  }, []);

  if(!props.user) {
    return (
      <div>
        <Notification/>
        <h1>Login to application</h1>
        <Login
          username={username} password={password}
          tryLogin={ loginEvent }/>
      </div>
    );
  }

  return (
    <div>
      <Notification/>
      <h1>blogs</h1>
      { props.user.name } logged in.<br/>
      <button onClick={ logoutEvent }>Logout</button><br/>
      <br/>
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  };
};

export default connect(
  mapStateToProps, {
    setNotification,
    createBlog,
    fetchBlogs,
    doLogin,
    doLogout,
    setUserData
  }
)(App);
