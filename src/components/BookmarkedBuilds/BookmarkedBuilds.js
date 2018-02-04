import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = (state) => {
  return {
    ...state.BookmarkedBuilds
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
class BookmarkedBuilds extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>BookmarkedBuilds -- Stateful w/ Redux</div>
    )
  }
}

BookmarkedBuilds = connect(mapStateToProps, mapDispatchToProps)(BookmarkedBuilds)

export default BookmarkedBuilds
