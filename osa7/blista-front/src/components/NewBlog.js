import React from 'react';
import Heading from 'react-bulma-components/lib/components/heading';

const NewBlog = ({ blogTitle, blogAuthor, blogUrl, createBlog }) => (
  <div>
    <Heading size="3">New blog</Heading>
    <label>Title: </label><input className="input" {...blogTitle}/><br/>
    <label>Author: </label><input className="input" {...blogAuthor}/><br/>
    <label>Url: </label><input  className="input" {...blogUrl}/><br/>
    <button className="button is-info" onClick={createBlog}>Create new blog</button><br/>
    <br/>
  </div>
);

export default NewBlog;