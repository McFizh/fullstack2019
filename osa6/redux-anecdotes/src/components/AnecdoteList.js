import React from 'react'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().sort( (a,b) => {
    return b.votes - a.votes;
  } );

  const vote = (id) => {
    props.store.dispatch(
      voteAnecdoteAction(id)
    )
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList