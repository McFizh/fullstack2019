import React from 'react';
import { render,  waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('doesn\'t render blogs when not logged in', async () => {
    const component = render(
      <App />
    );

    await waitForElement(
      () => component.container.querySelector('input[type="password"]')
    );

    expect(component.container).toHaveTextContent('Login to application');
  });

  test('renders blogs when logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };
    localStorage.setItem('appUser', JSON.stringify(user));

    const component = render(
      <App />
    );

    await waitForElement(
      () => component.container.querySelector('.blog')
    );

    expect(component.container).not.toHaveTextContent('Login to application');
    expect(component.container).toHaveTextContent('test title');
  });
});