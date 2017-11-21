import React from 'react'
import ReactDOM from 'react-dom'
// import Builder from './Builder'

import { Provider } from 'react-redux'
import { store, history } from '../components.js'
import { ConnectedRouter } from 'connected-react-router'

import firebase from 'firebase'
const config = {
  apiKey:
    process.env.FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY,
  messagingSenderId:
    process.env.FIREBASE_MESSAGING_SENDER_ID ||
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: 'boilerplate-pro',
  storageBucket: 'boilerplate-pro.appspot.com',
  authDomain: 'boilerplate-pro.firebaseapp.com',
  databaseURL: 'https://boilerplate-pro.firebaseio.com'
}
firebase.initializeApp(config)
// eslint-disable-next-line

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>{/* <Builder /> */}</ConnectedRouter>
    </Provider>,
    div
  )
})
