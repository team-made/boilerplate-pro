import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.BookmarkedBuilds
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
class BookmarkedBuilds extends Component {
  render () {
    return <div>BookmarkedBuilds</div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedBuilds)
