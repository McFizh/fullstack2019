import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: '25px'
  }

  const filterChanged = (val) => {
    props.setFilter(val);
  }

  return (
    <div style={style}>
      Filter:
      <input type='text' onChange={e=>filterChanged(e.target.value)}/>
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
