import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from './ListItem'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from '../components.js'

const testBoilerplate = {
  full_name: 'test',
  id: 1,
  name: 'testName',
  owner: { login: 'testLogin' },
  stargazers_count: 400
}

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ListItem boilerplate={testBoilerplate} />
      </ConnectedRouter>
    </Provider>,
    div
  )
})
