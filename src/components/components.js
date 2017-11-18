import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// This grabs all 'component.js' files in subdirectories under /components/
const allComponents = require.context('./', true, /component\.js$/)

// Grab the redux reducer function from the components's 'component' file, as well as the component itself
let reducers = {}
let components = {}
allComponents.keys().forEach(path => {
  let name = path.split('/')[1]
  let thisComponent = allComponents(path)
  if (!thisComponent.component) {
    console.warn(
      `Component "${name}" is in an invalid format, ignoring. Found at: "${path}"`
    )
  }
  components[name] = thisComponent.component
  if (thisComponent.reducer) {
    reducers[name] = thisComponent.reducer
  }
})

// Compile reducers
reducers = combineReducers(reducers)

// Start history
const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

// Merge middlewares
let middlewares = [routerMiddleware(history), thunkMiddleware]

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
