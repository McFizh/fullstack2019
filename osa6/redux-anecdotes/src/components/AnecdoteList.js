import React from 'react'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const filter = props.store
    .getState()
    .filter
    .toLocaleLowerCase();

  const anecdotes = props.store
    .getState()
    .anecdotes
    .filter( an => an.content.toLocaleLowerCase().includes(filter) )
    .sort( (a,b) => (b.votes - a.votes) );

  const vote = (an) => {
    props.store.dispatch(
      voteAnecdoteAction(an.id)
    );

    props.store.dispatch(
      setNotification(`You voted '${an.content}'`)
    );
    setTimeout( () => {
      props.store.dispatch(hideNotification());
    }, 5000);
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList