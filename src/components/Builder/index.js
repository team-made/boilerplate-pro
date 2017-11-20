// Include component
import component from './Builder.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('Builder')

// Action Definitions
const REPO_NAME = reduxUtil.defineAction('REPO_NAME')
const REPO_ID = reduxUtil.defineAction('REPO_ID')

// Initial State
const initialState = {
  repoName: '',
  repoId: 1
}

// Make Actions
const actions = {
  repoNameAction: reduxUtil.createAction(REPO_NAME),
  repoIdAction: reduxUtil.createAction(REPO_ID)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [REPO_NAME]: (state, action) => {
      let newState = { ...state, ...action.payload }
      return newState
    },
    [REPO_ID]: (state, action) => {
      let newState = { ...state, ...action.payload }
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
