import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
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
  const span = component.container.querySelector('span');

  expect(component.container).not.toHaveTextContent('123 likes');
  expect(component.container).not.toHaveTextContent('Added by');
  fireEvent.click(span);
  expect(component.container).toHaveTextContent('123 likes');
  expect(component.container).toHaveTextContent('Added by');
});
