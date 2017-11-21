import React from 'react'
import ReactDOM from 'react-dom'
import Deploy from './Deploy'

import { Provider } from 'react-redux'
import { store } from '../components.js'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <Deploy />
    </Provider>,
    div
  )
})
