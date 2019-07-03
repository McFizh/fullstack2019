import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: '25px'
  }

  const filterChanged = (val) => {
    props.store.dispatch( setFilter(val) );
  }

  return (
    <div style={style}>
      Filter:
      <input type='text' onChange={e=>filterChanged(e.target.value)}/>
    </div>
  )
}

export default Filter