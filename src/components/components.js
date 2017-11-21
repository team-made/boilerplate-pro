import { applyMiddleware, combineReducers, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createMemoryHistory from 'history/createMemoryHistory'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

// Import everything from each container (component, action, reducer)
import * as Example from './Example'
import * as App from './App'
import * as Navbar from './Navbar'
import * as List from './List'
import * as Builder from './Builder'
import * as UserRepo from './UserRepo'
import * as Testing from './Testing'
import * as Deploy from './Deploy'
const containers = {
  Example,
  App,
  Navbar,
  List,
  Builder,
  UserRepo,
  Testing,
  Deploy
}

// Grab the reducer and component from each container
let reducers = {}
const components = {}
Object.keys(containers).forEach(key => {
  components[key] = containers[key].component
  if (containers[key].reducer) reducers[key] = containers[key].reducer
})

// Compile reducers
reducers = combineReducers(reducers)

// Start history
const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

// Merge middlewares
let middlewares = [thunkMiddleware, routerMiddleware(history)]

// Development adds logging, must be last
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(
    createLogger({
      // Change this configuration to your liking
      duration: true,
      collapsed: true
    })
  )
}

// Generate store
const store = createStore(
  connectRouter(history)(reducers),
  composeWithDevTools(applyMiddleware(...middlewares))
)

// Export all the separate modules
export { components, history, store }
