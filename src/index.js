import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import 'bulma/css/bulma.css'

import './index.css'
import App from './components/App'
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

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
