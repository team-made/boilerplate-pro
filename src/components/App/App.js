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
      } else {
        this.props.setUser({ user: {} })
      }
    })
  }
  render () {
    return (
      <div className='App'>
        <components.Navbar user={this.props.user} />
        <div className='main-content'>
          <Switch>
            <Route exact path='/' component={components.List} />
            <Route path='/builder/:owner/:name' component={components.Builder} />
            <Route path='/repos/:id' component={components.UserRepo} />
            <Route path='/deploy' component={components.Deploy} />
            <Route path='/dashboard' component={components.Dashboard} />
          </Switch>
        </div>
        <footer className='footer'>
          <div className='container'>
            <div className='content has-text-centered'>
              <p>
                <strong>Boilerplate Pro</strong> by{' '}
                <a href='http://www.github.com/team-made'>Team-Made</a>. The source code
                is licensed{' '}
                <a href='http://opensource.org/licenses/mit-license.php'>
                  MIT
                </a>. 2017
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

const connectedApp = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)

export default connectedApp
