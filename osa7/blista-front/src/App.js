import React, { useState, useEffect } from 'react';
import  { useField } from './hooks';
import { connect } from 'react-redux';

import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';

import BlogService from './services/blogs';
import LoginService from './services/login';
import Togglable from './components/Togglable';

import { setNotification } from './reducers/notificationReducer';
import { fetchBlogs } from './reducers/blogReducer';

const App = (props) => {
  const [user, setUser] = useState(null);

  const [ blogTitle, resetTitle ] = useField('text');
  const [ blogAuthor, resetAuthor ] = useField('text');
  const [ blogUrl, resetUrl ] = useField('text');

  const [ username, resetUsername ] = useField('text');
  const [ password, resetPassword ] = useField('password');

  const blogFormRef = React.createRef();

  const tryLogin = async (username, password) => {
    try {
      const res = await LoginService.login({ username, password });
      window.localStorage.setItem(
        'appUser', JSON.stringify(res.data)
      );
      setUser(res.data);
      BlogService.setToken(res.data.token);
      resetUsername();
      resetPassword();
    } catch(err) {
      props.setNotification({
        message: 'Wrong username/password',
        type: 'error',
        delay: 3
      });
    }
  };

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('appUser');
    setUser(null);
    BlogService.setToken('');
  };

  const createBlog = async (e) => {
    e.preventDefault();
    try {
      await BlogService.createBlog( {
        title: blogTitle.value,
        author: blogAuthor.value,
        url: blogUrl.value
      } );

      blogFormRef.current.toggleVisibility();
      resetAuthor();
      resetTitle();
      resetUrl();
      props.fetchBlogs();

      props.setNotification({
        message: `New blog '${blogTitle.value}' created`,
        type: 'success',
        delay: 3
      });
    } catch(err) {
      props.setNotification({
        message: 'Blog creation failed',
        type: 'error',
        delay: 3
      });
    }
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
      const usrData = JSON.parse(appUser);
      setUser( usrData );
      BlogService.setToken(usrData.token);
    }

    props.fetchBlogs();
  }, []);

  if(!user) {
    return (
      <div>
        <Notification/>
        <h1>Login to application</h1>
        <Login
          username={username} password={password}
          tryLogin={tryLogin}/>
      </div>
    );
  }

  return (
    <div>
      <Notification/>
      <h1>blogs</h1>
      { user.name } logged in.<br/>
      <button onClick={ logout }>Logout</button><br/>
      <br/>
      { props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeAction={likeAction} removeAction={removeAction} user={user}/>
      ) }
      <br/>
      <Togglable buttonLabel='Create blog' ref={blogFormRef}>
        <NewBlog
          blogTitle={blogTitle} blogAuthor={blogAuthor} blogUrl={blogUrl}
          createBlog={createBlog}
        />
      </Togglable>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(
  mapStateToProps, { setNotification, fetchBlogs }
)(App);
