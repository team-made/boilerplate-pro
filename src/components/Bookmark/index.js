// Include component
import component from './Bookmark.js'

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js'
const reduxUtil = reduxHelper('Bookmark')

// Action Definitions
const USER_BOOKMARK = reduxUtil.defineAction('USER_BOOKMARK')

// Initial State
const initialState = {
  bookmark: null
}

// Make Actions
const actions = {
  userBookmarkAction: reduxUtil.createAction(USER_BOOKMARK)
}

// Make reducer
const reducer = reduxUtil.createReducer(
  {
    [USER_BOOKMARK]: (state, action) => {
      let newState = { bookmark: action.payload }
      newState.dummyState = true
      return newState
    }
  },
  initialState
)

// Export
export { component, actions, reducer }
