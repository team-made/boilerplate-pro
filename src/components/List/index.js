// Include component
import component from './List.js'
// import firebase from 'firebase'
// import 'firebase/firestore'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('List')

// Action Definitions
const ALL_BOILERPLATES = reduxUtil.defineAction('ALL_BOILERPLATES')

// Initial State
const initialState = {
  allBoilerplates: [],
  selectedBoilerplate: {}
}

// Make Actions
const actions = {
  allBoilerplatesAction: reduxUtil.createAction(ALL_BOILERPLATES)

}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [ALL_BOILERPLATES]: (state, action) => {
      let newState = { ...state, ...action.payload }
      return newState
    }

  },
  initialState
)

// Export
export { component, actions, reducer }
