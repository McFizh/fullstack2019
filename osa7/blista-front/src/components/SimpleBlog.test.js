import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const blog = {
  title: 'test title',
  author: 'test author',
  likes: 123
};

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog}/>
  );

  expect(component.container).toHaveTextContent(
    'test title test author'
  );
});

test('like button triggers twice', () => {
  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  );

  const btn = getByText('like');
  fireEvent.click(btn);
  fireEvent.click(btn);

  expect(mockHandler.mock.calls.length).toBe(2);
});