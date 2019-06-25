import React from 'react';

const NewBlog = ({ blogTitle, blogAuthor, blogUrl, createBlog }) => (
  <div>
    <h2>New blog</h2>
    Title: <input {...blogTitle}/><br/>
    Author: <input {...blogAuthor}/><br/>
    Url: <input {...blogUrl}/><br/>
    <button onClick={createBlog}>Create new blog</button>
  </div>
);

export default NewBlog;