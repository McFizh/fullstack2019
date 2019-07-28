import anecdoteService from '../services/anecdotes';

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdoteAction = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdoteAction = (id) => {
  return async dispatch => {
    const changedAn = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: {
        id,
        changedAn
      }
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [
        ...state,
        action.data
      ];
    case 'INIT':
      return action.data;
    case 'VOTE':
      return state.map( an => an.id !== action.data.id ? an : action.data.changedAn );
    default:
      return state;
  }
}

export default reducer