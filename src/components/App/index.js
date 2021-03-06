// Include component
import component from './App.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('App')

// Action Definitions
const SET_USER = reduxUtil.defineAction('SET_USER')

// Initial State
const initialState = {
  user: {}
}

// Make Actions
const actions = {
  setUser: reduxUtil.createAction(SET_USER)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [SET_USER]: (state, action) => {
      let newState = { ...state, ...action.payload }
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
