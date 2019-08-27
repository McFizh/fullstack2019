import React from 'react';

import { Link } from 'react-router-dom';

const Userlist = ({ users }) => {
  if(users === null) {
    return null;
  }

  return (
    <div>
      <h1>Users</h1>
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