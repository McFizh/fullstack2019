import React from 'react';

import { useField } from '../hooks';

const LoginView = ({ login, setMessage }) => {
  const [ username, resetUsername ] = useField('text');
  const [ password, resetPassword ] = useField('password');

  const doLogin = (e) => {
    e.preventDefault();
    setMessage('');
    login(username.value, password.value);
    resetUsername();
    resetPassword();
  }

  return <div className="login">
    <label>Username: </label><input {...username}/><br/>
    <label>Password: </label><input {...password}/><br/>
    <br/>
    <button onClick={doLogin}>Login</button>
  </div>;
}

export default LoginView;