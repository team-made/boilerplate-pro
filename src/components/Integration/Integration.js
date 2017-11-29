import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { history, components } from '../components.js'

const mapStateToProps = state => {
  return {
    ...state.Integration,
    ...state.App,
    ...state.Builder
  }
}

class Integration extends React.Component {
  componentDidMount () {
    if (!this.props.match.params.repoName) {
      history.push('/')
    }

    let travisLoad = setInterval(() => {
      this.setState({
        enableBtn: true,
        btnMessage: 'Integrate With Travis Testing'
      })
    }, 1000)
    setTimeout(() => {
      clearInterval(travisLoad)
    }, 1100)
  }

  constructor (props) {
    super(props)
    this.state = {
      repoId: 1,
      btnMessage: 'Loading...',
      successMessage: '',
      enableBtn: false
    }
    this.handleTestInit = this.handleTestInit.bind(this)
  }

  async handleTestInit () {
    const { githubUsername, githubToken } = this.props.user
    const repoName = this.props.match.params.repoName
    const data = {
      token: githubToken,
      repo: repoName,
      username: githubUsername
    }
    // console.log('github', githubToken)
    this.setState({
      btnMessage: 'Loading...',
      enableBtn: false,
      successMessage: ''
    })
    await axios
      .post(`https://boilerplate-pro-server.herokuapp.com/travis`, data)
      // .post(`http://localhost:9090/travis`, data) //FOR LOCAL TESTING
      .then(travis => {
        // console.log('Success: ', JSON.stringify(travis))
        this.setState({
          successMessage: 'Successful Integration!',
          btnMessage: 'Complete',
          enableBtn: false
        })
        history.push(`/success/deployment/${repoName}`)
      })
      .catch(err => {
        this.setState({
          successMessage: 'Travis is still syncing, please try again!'
        })
        let travisLoad = setInterval(() => {
          this.setState({
            enableBtn: true,
            btnMessage: 'Integrate With Travis Testing'
          })
        }, 3000)
        setTimeout(() => {
          clearInterval(travisLoad)
        }, 3100)
        console.error('error caught: ', err)
      })
  }

  render () {
    return (
      <div className='container' style={{ maxWidth: '600px' }}>
        <components.ServiceCard
          name='Travis CI'
          logo='url'
          handleSwitchState={state => console.log('state', state)}
          description='something here'
        />
        <components.ServiceCard
          name='Codeship'
          logo='url'
          handleSwitchState={state => console.log('state', state)}
          description='something here'
        />
        <components.ServiceCard
          name='Slack'
          logo='url'
          handleSwitchState={state => console.log('state', state)}
          description='something here'
        />
        <button
          type='button'
          disabled={!this.state.enableBtn}
          onClick={this.handleTestInit}
          className='button'
        >
          {this.state.btnMessage}
        </button>
        <div>{this.state.successMessage}</div>
      </div>
    )
  }
}

const connectedIntegration = connect(mapStateToProps)(Integration)

export default connectedIntegration
