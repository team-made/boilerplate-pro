import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import firebase from 'firebase'
import algoliasearch from 'algoliasearch/lite'

import './App.css'

import { actions } from './index.js'
import { components } from '../components.js'

// Initialize Algolia Search
const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_SEARCH_KEY
)
const index = client.initIndex('boilerplates')

const mapStateToProps = state => ({ ...state.App })

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
          .catch(console.error)
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
            <Route
              exact
              path='/'
              render={() => <components.List index={index} />}
            />
            <Route path='/dashboard' component={components.Dashboard} />
            <Route
              path='/builder/:owner/:name'
              component={components.Builder}
            />
            <Route
              path='/repo/:owner/:name'
              component={components.SingleRepo}
            />
            <Route path='/success/:repoName' component={components.Success} />
            <Route path='/deploy/:repoName' component={components.Deploy} />
            <Route
              path='/testintegration/:repoName'
              component={components.TestIntegration}
            />
            <Route path='/dashboard' component={components.Dashboard} />

          </Switch>
        </div>
        <components.Footer />
      </div>
    )
  }
}

const connectedApp = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)

export default connectedApp
