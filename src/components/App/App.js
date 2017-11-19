import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import { components, history, store } from '../components.js'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className='App'>
            <components.Navbar />
            <Switch>
              <Route exact path='/' component={components.Panel} />
              <Route path='/builder' component={components.Builder} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
