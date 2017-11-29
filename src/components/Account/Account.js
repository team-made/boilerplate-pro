import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = (state) => {
  return {
    ...state.Account,
    ...state.App
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
class Account extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    console.log(this.props)
    return (
      // this.props.user.uid
      <div>Account -- Stateful w/ Redux</div>
    )
  }
}

const connectedAccount = connect(mapStateToProps, mapDispatchToProps)(Account)

export default connectedAccount
