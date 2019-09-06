import React, { useEffect } from 'react';
import  { useField } from './hooks';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import Notification from './components/Notification';
import Header from './components/Header';

import Userlist from './views/userlist';
import Bloglist from './views/bloglist';
import Userinfo from './views/userinfo';
import Bloginfo from './views/bloginfo';

import { doLogin, doLogout, setUserData } from './reducers/userReducer';

const App = (props) => {

  const [ username, resetUsername ] = useField('text');
  const [ password, resetPassword ] = useField('password');

  const resetCallbacks = {
    resetUsername,
    resetPassword,
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

  const getBlogById = (id) => !props.blogs ? null : props.blogs.find( b => b.id === id );
  const getUserById = (id) => !props.users ? null : props.users.find( b => b.id === id );

  return (
    <div>
      <Header/>
      <Notification/>
      <Route exact path="/" render={ () => <Bloglist blogs={props.blogs}/> } />
      <Route exact path="/blogs/:id" render={ ({ match }) => <Bloginfo blog={ getBlogById(match.params.id) } user={props.user}/> } />
      <Route exact path="/users" render={() => <Userlist users={props.users}/>} />
      <Route exact path="/users/:id" render={ ({ match }) => <Userinfo user={ getUserById(match.params.id ) }/> } />

      { props.user.name } logged in.<br/>
      <button onClick={ logoutEvent }>Logout</button><br/>
      <br/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  };
};

export default connect(
  mapStateToProps, {
    doLogin,
    doLogout,
    setUserData
  }
)(App);
