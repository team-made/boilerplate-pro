import React from 'react'
import ReactDOM from 'react-dom'
import TestIntegration from './TestIntegration'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { store, history } from '../components.js'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <TestIntegration />
      </ConnectedRouter>
    </Provider>,
    div
  )
})
