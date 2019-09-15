import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
  const [ visible, setVisible ] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  if(!visible) {
    return (
      <div>
        <button className="button is-primary" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    );
  }

  return (
    <div>
      {props.children}
      <button className="button is-primary" onClick={toggleVisibility}>cancel</button>
    </div>
  );
});

Togglable.displayName='togglable';

export default Togglable;