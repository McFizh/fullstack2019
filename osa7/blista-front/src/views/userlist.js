import React from 'react';

import { Link } from 'react-router-dom';

import Heading from 'react-bulma-components/lib/components/heading';
import Table from 'react-bulma-components/lib/components/table';

const Userlist = ({ users }) => {
  if(users === null) {
    return null;
  }

  return (
    <div>
      <Heading>List of users</Heading>
      <Table>
        <thead>
          <tr>
            <td>User</td>
            <td># blogs</td>
          </tr>
        </thead>
        <tbody>
          { users.map( user => <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr> )}
        </tbody>
      </Table>
    </div>
  );
};

export default Userlist;