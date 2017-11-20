import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import { Provider } from 'react-redux'
import { store } from '../components.js'
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

const userInfo = { email: 'something@email.com' }

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <Navbar user={userInfo} />
    </Provider>,
    div
  )
})
