// Include component
import component from './PreviousBuilds.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('Dashboard')

// Action Definitions
const USER_DATA = reduxUtil.defineAction('USER_DATA')

// Initial State
const initialState = {
  userData: []
}

// Make Actions
const actions = {
  userDataAction: reduxUtil.createAction(USER_DATA)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [USER_DATA]: (state, action) => {
      let newState = { userData: action.payload }
      newState.dummyState = true
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
