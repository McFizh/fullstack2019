import React, { useState } from 'react';

import Navbar from 'react-bulma-components/lib/components/navbar';

const Header = () => {
  const [ open, setOpen ] = useState(false);

  return (
    <Navbar active={open}>
      <Navbar.Brand>
        <Navbar.Burger active={open} onClick={ () => setOpen(!open) } />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Item>
          Blogs
        </Navbar.Item>
        <Navbar.Item>
          Users
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;