import React from 'react'
import ReactDOM from 'react-dom'
import List from './List'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from '../components.js'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <List />
      </ConnectedRouter>
    </Provider>,
    div
  )
})
