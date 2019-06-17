import React from 'react';

const NewBlog = ({ blogTitle, blogAuthor, blogUrl, setBlogTitle, setBlogAuthor, setBlogUrl, createBlog }) => (
  <div>
    <h2>New blog</h2>
    Title: <input type='text' value={blogTitle} onChange={ (e) => setBlogTitle(e.target.value) }/><br/>
    Author: <input type='text' value={blogAuthor} onChange={ (e) => setBlogAuthor(e.target.value) }/><br/>
    Url: <input type='text' value={blogUrl} onChange={ (e) => setBlogUrl(e.target.value) }/><br/>
    <button onClick={createBlog}>Create new blog</button>
  </div>
);

export default NewBlog;