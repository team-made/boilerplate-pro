// Include component
import component from './List.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('List')

// Action Definitions
const SET_BOILERPLATES = reduxUtil.defineAction('SET_BOILERPLATES')

// Initial State
const initialState = {
  boilerplates: []
}

// Make Actions
const actions = {
  setBoilerplates: reduxUtil.createAction(SET_BOILERPLATES)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [SET_BOILERPLATES]: (state, action) => {
      let newState = { ...state, ...action.payload }
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
