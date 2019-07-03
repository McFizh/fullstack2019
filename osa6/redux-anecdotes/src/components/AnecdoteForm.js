import React from 'react'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const formStyle = {
    marginBottom: '25px'
  };

  const createAnecdote = (e) => {
    e.preventDefault();

    const fld = e.target.form.anecdote;
    if(fld.value.length === 0) {
      return;
    }

    props.store.dispatch(
      createAnecdoteAction(fld.value)
    );

    props.store.dispatch(
      setNotification(`Anecdote created: '${fld.value}'`)
    );
    setTimeout( () => {
      props.store.dispatch(hideNotification());
    }, 5000);

    fld.value='';
  }

  return(
    <div style={formStyle}>
    <h2>create new</h2>
      <form>
        <div>
          <input name="anecdote"/>
          <button onClick={createAnecdote}>create</button>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm