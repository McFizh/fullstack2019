import React from 'react';

const Login = ({ username, password, tryLogin }) => {
  const clickLogin = (e) => {
    e.preventDefault();
    tryLogin(username.value, password.value);
  };

  return (
    <div>
      Username: <input { ...username } /><br/>
      Password: <input { ...password }/><br/>
      <br/>
      <button onClick={clickLogin}>Login</button>
    </div>
  );
};

export default Login;