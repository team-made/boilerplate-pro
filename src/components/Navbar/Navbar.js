import React from 'react'
import { connect } from 'react-redux'

import { actions } from './component.js'

const mapStateToProps = state => {
  return {
    ...state.Navbar
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
const Navbar = () => {
  return <div>Navbar -- Stateless w/ Redux</div>
}

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default connectedNavbar
