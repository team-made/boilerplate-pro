import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { actions } from './index.js'

import './App.css'

import { components } from '../components.js'

const mapStateToProps = state => {
  return {
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(actions.setUser(user))
    }
  }
}
class App extends Component {
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.props.setUser({ user: doc.data() })
            } else {
              console.warn('Error at App cdm, firestore user')
            }
          })
          .catch(err => console.error(err))
      }
    })
  }
  render () {
    return (
      <div className='App'>
        <components.Navbar />
        <Switch>
          <Route exact path='/' component={components.List} />
          <Route
            path='/builder/:owner/:reponame'
            component={components.Builder}
          />
          <Route path='/repos/:id' component={components.UserRepo} />
        </Switch>
      </div>
    )
  }
}

const connectedApp = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)

export default connectedApp
