import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  return (
    <div>
      <AnecdoteForm store={props.store} />
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App