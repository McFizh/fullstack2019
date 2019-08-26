import React from 'react';

const Login = ({ username, password, tryLogin }) => {
  return (
    <div>
      Username: <input { ...username } /><br/>
      Password: <input { ...password }/><br/>
      <br/>
      <button onClick={tryLogin}>Login</button>
    </div>
  );
};

export default Login;