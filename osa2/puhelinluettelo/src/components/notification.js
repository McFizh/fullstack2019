import React from 'react';

export const Notification = ({note}) => {
  if(!note) {
    return null;
  }

  return (
    <div className={ `${note.type}-notification` }>{note.msg}</div>
  )
}
