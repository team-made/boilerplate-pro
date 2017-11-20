import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
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
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.props.setUser({ user: doc.data() })
          } else {
            console.warn('No such user')
          }
        })
        .catch(err => console.error(err))
    })
  }
  render () {
    return (
      <div className='App'>
        <components.Navbar />
        <Switch>
          <Route exact path='/' component={components.List} />
          <Route path='/builder' component={components.Builder} />
          <Route path='/repos/:id' component={components.UserRepo} />
        </Switch>
      </div>
    )
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default connectedApp
