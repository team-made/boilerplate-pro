// Include component
import component from './Navbar.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('Navbar')

// Action Definitions
const SIGN_IN = reduxUtil.defineAction('SIGN_IN')
const SIGN_OUT = reduxUtil.defineAction('SIGN_OUT')

// Initial State
const initialState = {
  user: {}
}

// Make Actions
const actions = {
  signIn: reduxUtil.createAction(SIGN_IN),
  signOut: reduxUtil.createAction(SIGN_OUT)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [SIGN_IN]: (state, action) => {
      let newState = { ...state, ...action.payload }
      return newState
    },
    [SIGN_OUT]: (state, action) => {
      let newState = {}
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
