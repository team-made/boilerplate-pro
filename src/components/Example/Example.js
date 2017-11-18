import React from 'react'
import { connect } from 'react-redux'

import { actions } from './component.js'

const mapStateToProps = state => {
  return {
    ...state.Example
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
const Example = () => {
  return <div>Example -- Stateless w/ Redux</div>
}

const connected_Example = connect(mapStateToProps, mapDispatchToProps)(Example)

export default connected_Example
