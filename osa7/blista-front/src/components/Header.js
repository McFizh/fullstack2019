import React from 'react';

import Navbar from 'react-bulma-components/lib/components/navbar';

const Header = () => {
  return (
    <Navbar>
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