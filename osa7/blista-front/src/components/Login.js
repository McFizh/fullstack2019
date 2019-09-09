import React from 'react';

import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';

import {
  Field, Control,
  Label, Input
} from 'react-bulma-components/lib/components/form';

const Login = ({ username, password, tryLogin }) => {
  return (
    <Section className="loginSection">
      <div className="titleContainer">

        <div className="title">Login to application</div>

        <div className="fieldContainer">

          <Field>
            <Label>Username:</Label>
            <Control>
              <Input { ...username }/>
            </Control>
          </Field>

          <Field>
            <Label>Password:</Label>
            <Control>
              <Input {...password}/>
            </Control>
          </Field>

          <Button
            onClick={tryLogin}
            color="primary"
            rounded={true}
            outlined={true}>Login</Button>
        </div>
      </div>
    </Section>
  );
};

export default Login;