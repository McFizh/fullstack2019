import React from 'react';

import { Link } from 'react-router-dom'

const Header = ({ authToken, setAuthToken }) => {
  const logout = (e) => {
    e.preventDefault();
    setAuthToken('');
  }

  const newBookLink = authToken === '' ? null : <Link to="/addbook">New book</Link>;
  const sessionLink = authToken !== '' ?
    <button onClick={logout}>Logout</button> :
    <Link to="/login">Login</Link>;

  return <div>
    <Link to="/">Books</Link> &nbsp;
    <Link to="/authors">Authors</Link> &nbsp;
    {newBookLink}
    &nbsp; | &nbsp;
    {sessionLink}
    <hr/>
  </div>;
}

export default Header;