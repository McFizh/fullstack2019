import React, { useState } from 'react';
import { connect } from 'react-redux';

import { doLogout } from '../reducers/userReducer';

import { Link } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';

const Header = (props) => {
  const [ open, setOpen ] = useState(false);

  const logoutEvent = (e) => {
    e.preventDefault();
    props.doLogout();
  };

  return (
    <Navbar active={open}>
      <Navbar.Brand>
        <Navbar.Burger active={open ? true : undefined} onClick={ () => setOpen(!open) } />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Item renderAs="div">
          <Link to="/">Blogs</Link>
        </Navbar.Item>
        <Navbar.Item renderAs="div">
          <Link to="/users">Users</Link>
        </Navbar.Item>
        <Navbar.Container position="end">
          <Navbar.Item renderAs="div">
            { props.user.name } logged in.<br/>
          </Navbar.Item>
          <Navbar.Item renderAs="div">
            <Button onClick={ logoutEvent }>Logout</Button>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps, {
    doLogout
  }
)(Header);
