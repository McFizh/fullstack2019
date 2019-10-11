import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { LOGIN } from '../graphql/queries';
import { useField } from '../hooks';

const LoginView = ({ setAuthToken, setMessage, profile }) => {
  const [ username, resetUsername ] = useField('text');
  const [ password, resetPassword ] = useField('password');
  const [ login ] = useMutation(LOGIN);

  const loginAction = async (username, password) => {
    try {
      const result = await login({
        variables: {
          username,
          password
        }
      });
      const token = result.data.login.value;

      setAuthToken(token);
      localStorage.setItem('user-token', token);
      profile.refetch();
    } catch(err) {
      setMessage('Login failed');
    }
  }

  const doLogin = (e) => {
    e.preventDefault();
    setMessage('');
    loginAction(username.value, password.value);
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