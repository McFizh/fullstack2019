import React from 'react';

const Login = ({ username, password, setUsername, setPassword, tryLogin }) => {

  const clickLogin = (e) => {
    e.preventDefault();
    tryLogin(username, password);
  };

  return (
    <div>
      Username: <input type="text" value={username} onChange={ (e) => setUsername(e.target.value) }/><br/>
      Password: <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } /><br/>
      <br/>
      <button onClick={clickLogin}>Login</button>
    </div>
  );
};

export default Login;