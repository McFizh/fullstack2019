import React from 'react';

import { Link } from 'react-router-dom';

import Heading from 'react-bulma-components/lib/components/heading';

const Userlist = ({ users }) => {
  if(users === null) {
    return null;
  }

  return (
    <div>
      <Heading>List of users</Heading>
      { users.map( user => <div key={user.id}>
        <Link to={`/users/${user.id}`}>
          {user.name}
        </Link>

        {user.blogs.length}
      </div> )}
    </div>
  );
};

export default Userlist;