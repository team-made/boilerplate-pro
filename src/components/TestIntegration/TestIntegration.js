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
    const repoName = this.props.repoName
    const { githubUsername, githubToken } = this.props.user
    const config = {
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json',
        'User-Agent': 'MyClient/1.0.0',
        'Host': 'api.travis-ci.org',
        'Content-Type': 'application/json'
      }
    }
    const data = {
      github_token: { githubToken }
    }
    await axios.post(`https://api.travis-ci.org/auth/github`, data, config).then(data => console.log('token data: ', data))
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
