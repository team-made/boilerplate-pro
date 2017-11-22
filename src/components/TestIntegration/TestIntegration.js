/* eslint-disable*/ 

import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.TestIntegration,
    ...state.App,
    ...state.Builder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}

class TestIntegration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      repoId: 1
    }
    this.handleTestInit = this.handleTestInit.bind(this)
  }

  async handleTestInit () {
    const { githubUsername, githubToken } = this.props.user
    const repoName = this.props.repoName
   
    const data = {token: githubToken, repo: repoName, username: githubUsername}
    console.log('github', githubToken)
    await axios
      .post(`https://boilerplate-pro-server.herokuapp.com/travis`, data)
      .then(travis => console.log('token data: ', JSON.stringify(travis)))
      .catch(err => console.error(err))
  }

  render () {
    return (
      <div>
        <button onClick={this.handleTestInit} className='button'>
          Integrate with Travis Testing
        </button>
      </div>
    )
  }
}

const connectedTestIntegration = connect(mapStateToProps, mapDispatchToProps)(
  TestIntegration
)

export default connectedTestIntegration
