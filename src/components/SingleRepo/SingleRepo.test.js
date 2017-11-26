import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase'

import { store } from '../components.js'
import SingleRepo from './SingleRepo'

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
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <SingleRepo match={{ params: { name: 'test', owner: 'test' } }} />
    </Provider>,
    div
  )
})
