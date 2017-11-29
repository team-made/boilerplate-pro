// Include component
import component from './Success.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('Success')

// Action Definitions
const SET_CURRENT_REPO = reduxUtil.defineAction('SET_CURRENT_REPO')

// Initial State
const initialState = {
  currentRepo: {}
}

// Make Actions
const actions = {
  setCurrentRepo: reduxUtil.createAction(SET_CURRENT_REPO)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [SET_CURRENT_REPO]: (state, action) => {
      let newState = { ...state, ...action.payload }
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
