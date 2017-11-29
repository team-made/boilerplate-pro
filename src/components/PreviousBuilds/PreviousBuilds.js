import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = (state) => { return {
  ...state.PreviousBuilds
} }
const mapDispatchToProps = (dispatch) => { return {
  dummyAction: () => {
    dispatch( actions.dummyAction() )
  }
} }
class PreviousBuilds extends Component {
  constructor( props ) {
    super( props )
  }
  render() {
    return (
      <div>PreviousBuilds -- Stateful w/ Redux</div>
    )
  }
}

PreviousBuilds = connect(mapStateToProps, mapDispatchToProps)(PreviousBuilds)

export default PreviousBuilds
