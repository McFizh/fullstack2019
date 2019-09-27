import React from 'react';

import { Link } from 'react-router-dom'

const Header = () => {
  return <div>
    <Link to="/">Books</Link> &nbsp;
    <Link to="/authors">Authors</Link> &nbsp;
    <Link to="/addbook">New book</Link> &nbsp;
    <hr/>
  </div>;
}

export default Header;