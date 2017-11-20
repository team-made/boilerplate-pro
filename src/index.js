import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import 'bulma/css/bulma.css'
import 'firebase/firestore'
import './index.css'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

// Grab all components dynamically
import { components, history, store } from './components/components.js'
import registerServiceWorker from './utils/registerServiceWorker'

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

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <components.App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
