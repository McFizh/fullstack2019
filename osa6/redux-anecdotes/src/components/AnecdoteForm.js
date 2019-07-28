import React from 'react'
import { connect } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

    props.createAnecdoteAction(fld.value);
    props.setNotification(`Anecdote created: '${fld.value}'`, 5);
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

const mapDispatchToProps = {
  createAnecdoteAction,
  setNotification
}

const ConnectedAForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAForm