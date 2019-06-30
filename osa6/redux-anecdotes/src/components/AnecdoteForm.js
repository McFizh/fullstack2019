import React from 'react'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'

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