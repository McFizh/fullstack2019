import React from 'react';
import { render } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'test title',
  author: 'test author',
  likes: 123,
  user: {
    username: 'test'
  }
};

const user = {
  username: 'test'
};

test('renders content', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  );
  expect(component.container).not.toHaveTextContent('123 likes');
  expect(component.container).not.toHaveTextContent('Added by');
});
