import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { history, components } from '../components.js'

import travis from '../../assets/travis.svg'
import codeship from '../../assets/codeship.png'
import slack from '../../assets/slack.png'

const mapStateToProps = state => {
  return {
    ...state.Integration,
    ...state.App,
    ...state.Builder
  }
}

class Integration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      btnMessage: 'Skip',
      successMessage: '',
      enableBtn: true,
      travis: false,
      codeship: false,
      slack: false
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
          active
          name='Travis CI'
          logo={travis}
          handleSwitchState={event =>
            this.setState({ travis: !this.state.travis })
          }
          description={`Test and Deploy with Confidence. Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes!`}
        />
        <components.ServiceCard
          name='Codeship'
          logo={codeship}
          handleSwitchState={event =>
            this.setState({ codeship: !this.state.codeship })
          }
          description='Codeship is a fast and secure hosted Continuous Integration service that scales with your needs. It supports GitHub, Bitbucket, and Gitlab projects.'
        />
        <components.ServiceCard
          name='Slack'
          logo={slack}
          handleSwitchState={event =>
            this.setState({ slack: !this.state.slack })
          }
          description={`Slack is where work flows. It's where the people you need, the information you share, and the tools you use come together to get things done.`}
        />

        {!this.state.enableBtn ? (
          <div style={{ margin: '30px 0' }}>
            <components.Spinner />
          </div>
        ) : (
          <button
            type='button'
            disabled={!this.state.enableBtn}
            style={{ margin: '20px' }}
            onClick={
              this.state.travis
                ? this.handleTestInit
                : () =>
                  history.push(
                    `/success/deployment/${this.props.match.params.repoName}`
                  )
            }
            className={`button ${this.state.travis ? 'is-primary' : ''}`}
          >
            {this.state.travis ? 'Integrate' : this.state.btnMessage}
          </button>
        )}

        <div>{this.state.successMessage}</div>
      </div>
    )
  }
}

const connectedIntegration = connect(mapStateToProps)(Integration)

export default connectedIntegration
