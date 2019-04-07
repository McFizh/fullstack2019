import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const randomLine = () => () =>  {
    setSelected( Math.floor(Math.random()*anecdotes.length) )
  }

  const vote = () => () => {
    const val = votes[selected] || 0;
    const copy = { ...votes }
    copy[selected] = val+1;
    setVotes(copy);
  }

  const popularVote = () => {
    let largest = 0;
    let largestIdx = 0;

    anecdotes.forEach( (val,idx) => {
      const voteVal = votes[idx] || 0;

      if(voteVal > largest) {
        largestIdx = idx;
        largest = voteVal;
      }
    });

    return anecdotes[largestIdx];
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br/>
      has { votes[selected] || 0 } votes<br/>
      <br/>
      <button onClick={ vote() }>Vote</button> &nbsp;
      <button onClick={ randomLine() }>Next anecdote</button><br/>
      <br/>
      <h1>Anecdote with most votes</h1>
      {popularVote()}
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)