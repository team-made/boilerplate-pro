import React from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.Deploy
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
const Deploy = () => {
  return (
    <div>
      <a
        href='https://www.heroku.com/deploy/?template=https://github.com/heroku/node-js-getting-started'
        className='button is-link'
        style={{ padding: '5px' }}
      >
        <span>Deploy to Heroku</span>
      </a>
    </div>
  )
}

const connectedDeploy = connect(mapStateToProps, mapDispatchToProps)(Deploy)

export default connectedDeploy
