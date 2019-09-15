import React from 'react';
import { Link } from 'react-router-dom';

import Heading from 'react-bulma-components/lib/components/heading';

const Userinfo = ({ user }) => {
  if(user === null) {
    return null;
  }

  return (
    <div>
      <Heading>{user.name}</Heading>
      <Heading size="3">Added blogs</Heading>
      {user.blogs.map(blog => <div key={blog.id}>&raquo; <Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
    </div>
  );
};

export default Userinfo;