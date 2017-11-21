import React from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.Deploy,
    ...state.Builder,
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
const Deploy = props => {
  return (
    <div>
      <div className='field' style={{ width: '400px', margin: '0 auto' }}>
        <br />
        <h1 className='subtitle is-2'>Deploy</h1>
        <p>Current RepoName is: {props.repoName}</p>
        <p>Current GH User is: {props.user.githubUsername}</p>
        <p>
          Github Link: https://github.com/{props.user.githubUsername}/{props.repoName}
        </p>

        <a
          href={`https://www.heroku.com/deploy/?template=https://github.com/${props
            .user.githubUsername}/${props.repoName}`}
          className='button is-link'
          style={{ padding: '5px' }}
        >
          <span>Deploy to Heroku</span>
        </a>
      </div>
    </div>
  )
}

const connectedDeploy = connect(mapStateToProps, mapDispatchToProps)(Deploy)

export default connectedDeploy
