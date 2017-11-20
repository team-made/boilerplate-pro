// Include component
import component from './UserRepo.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('UserRepo')

// Action Definitions
const REPO_DATA = reduxUtil.defineAction('REPO_DATA')

// Initial State
const initialState = {
  repoData: {}
}

// Make Actions
const actions = {
  userRepoAction: reduxUtil.createAction(REPO_DATA)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [REPO_DATA]: (state, action) => {
      let newState = { ...state, ...action.payload }
      newState.dummyState = true
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
