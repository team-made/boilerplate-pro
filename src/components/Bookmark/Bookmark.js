import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = (state) => {
  return {
    ...state.Bookmark
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    makeBookmark: () => {
      dispatch(actions.userBookmarkAction())
    }
  }
}
class Bookmark extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repo: null
    }
  }
  render () {
    return (
      <div>
        <i className='fa fa-bookmark' />
      </div>
    )
  }
}

Bookmark = connect(mapStateToProps, mapDispatchToProps)(Bookmark)

export default Bookmark
