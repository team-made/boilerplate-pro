import React from 'react'
import ReactDOM from 'react-dom'
import Builder from './Builder'

import { Provider } from 'react-redux'
import { store, history } from '../components.js'
import { ConnectedRouter } from 'connected-react-router'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Builder />
      </ConnectedRouter>
    </Provider>,
    div
  )
})
