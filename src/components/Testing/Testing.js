import React from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.Testing
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
const Testing = () => {
  return <div>Testing -- Stateless w/ Redux</div>
}

const connectedTesting = connect(mapStateToProps, mapDispatchToProps)(Testing)

export default connectedTesting
