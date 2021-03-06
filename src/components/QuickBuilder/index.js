// Include component
import component from './QuickBuilder.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('QuickBuilder')

// Action Definitions
const DUMMY_ACTION = reduxUtil.defineAction('DUMMY_ACTION')

// Initial State
const initialState = {
  dummyState: false
}

// Make Actions
const actions = {
  dummyAction: reduxUtil.createAction(DUMMY_ACTION)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [DUMMY_ACTION]: (state, action) => {
      let newState = { ...state, ...action.payload }
      newState.dummyState = true
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
