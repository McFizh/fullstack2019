import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';

import BlogService from './services/blogs';
import LoginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const [notification, setNotification] = useState({});

  const noteFormRef = React.createRef();

  const tryLogin = async (username, password) => {
    try {
      const res = await LoginService.login({ username, password });
      window.localStorage.setItem(
        'appUser', JSON.stringify(res.data)
      );
      setUser(res.data);
      BlogService.setToken(res.data.token);
      setUsername('');
      setPassword('');
    } catch(err) {
      console.log('err state', err);
      setNotification({
        message: 'Wrong username/password',
        type: 'error'
      });
      setTimeout( () => setNotification({}), 3000 );
    }
  };

  const fetchBlogs = async () => {
    const blogs = (await BlogService.getAll()).data;
    setBlogs(
      blogs.sort( (a,b) => a.likes === b.likes ? 0 : (a.likes > b.likes ? -1 : 1 ) )
    );
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
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      } );
      fetchBlogs();
      setNotification({
        message: `New blog '${blogTitle}' created`,
        type: 'success'
      });
      setTimeout( () => setNotification({}), 3000 );
      noteFormRef.current.toggleVisibility();
    } catch(err) {
      setNotification({
        message: 'Blog creation failed',
        type: 'error'
      });
      setTimeout( () => setNotification({}), 3000 );
    }
  };

  const likeAction = async ( blog ) => {
    try {
      await BlogService.likeAction(blog.id, blog.likes+1);
      fetchBlogs();
    } catch(err) {
      console.log(err);
    }
  };

  const removeAction = async ( blog ) => {
    try {
      await BlogService.remove(blog.id);
      fetchBlogs();
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

    fetchBlogs();
  }, []);

  if(!user) {
    return (
      <div>
        <Notification notification={notification}/>
        <h1>Login to application</h1>
        <Login
          username={username} password={password}
          setUsername={setUsername} setPassword={setPassword}
          tryLogin={tryLogin}/>
      </div>
    );
  }


  return (
    <div>
      <Notification  notification={notification}/>
      <h1>blogs</h1>
      { user.name } logged in.<br/>
      <button onClick={ logout }>Logout</button><br/>
      <br/>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeAction={likeAction} removeAction={removeAction} user={user}/>
      ) }
      <br/>
      <Togglable buttonLabel='Create blog' ref={noteFormRef}>
        <NewBlog
          blogTitle={blogTitle} blogAuthor={blogAuthor} blogUrl={blogUrl}
          setBlogTitle={setBlogTitle} setBlogAuthor={setBlogAuthor} setBlogUrl={setBlogUrl}
          createBlog={createBlog}
        />
      </Togglable>
    </div>
  );
};

export default App;