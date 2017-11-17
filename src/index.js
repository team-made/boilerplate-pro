import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import './index.css'
import App from './components/App'
import registerServiceWorker from './utils/registerServiceWorker'
import { config } from '../secrets'

firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
