import React from 'react'
import ReactDOM from 'react-dom'
import UserRepo from './UserRepo'

import { Provider } from 'react-redux'
import { store, history } from '../components.js'
import { ConnectedRouter } from 'connected-react-router'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <UserRepo />
      </ConnectedRouter>
    </Provider>,
    div
  )
})
