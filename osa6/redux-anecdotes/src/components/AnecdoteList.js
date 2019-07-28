import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (an) => {
    props.voteAnecdoteAction(an.id)
    props.setNotification(`You voted '${an.content}'`, 5)
  }

  return(
    <div>
      {props.anecdotes.map(anecdote =>
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

const filteredAnecdotes = ({anecdotes, filter}) => {
  const lcfilter = filter.toLocaleLowerCase();

  return anecdotes
  .filter( an => an.content.toLocaleLowerCase().includes(lcfilter) )
  .sort( (a,b) => (b.votes - a.votes) );
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filteredAnecdotes(state),
  }
}

const mapDispatchToProps = {
  voteAnecdoteAction,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes