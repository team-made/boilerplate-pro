import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { history, components } from '../components'
import { actions } from './index.js'

import heroku from '../../assets/heroku.png'
import firebase from '../../assets/firebase.png'
import aws from '../../assets/aws.png'
import digitalOcean from '../../assets/digitalOcean.png'

const mapStateToProps = state => {
  return {
    ...state.Deployment,
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

class Deployment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      heroku: false,
      firebase: false,
      aws: false,
      digitalOcean: false
    }
  }

  render () {
    return (
      <div>
        <div className='container' style={{ maxWidth: '600px' }}>
          <br />
          <components.ServiceCard
            active
            name='Heroku'
            logo={heroku}
            handleSwitchState={event =>
              this.setState({ heroku: !this.state.heroku })
            }
            description='Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.'
          />
          <components.ServiceCard
            name='Firebase'
            logo={firebase}
            handleSwitchState={event =>
              this.setState({ firebase: !this.state.firebase })
            }
            description="Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business."
          />
          <components.ServiceCard
            name='AWS'
            logo={aws}
            handleSwitchState={event => this.setState({ aws: !this.state.aws })}
            description='Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services. Free to join, pay only for what you use.'
          />
          <components.ServiceCard
            name='Digital Ocean'
            logo={digitalOcean}
            handleSwitchState={event =>
              this.setState({ digitalOcean: !this.state.digitalOcean })
            }
            description='DigitalOcean is a simple and robust cloud computing platform, designed for developers.'
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '20px'
            }}
          >
            <Link
              to={`/success/integration/${this.props.match.params.repoName}`}
              className='button'
            >
              Back to Integration
            </Link>
            {this.state.heroku ? (
              <a
                target='_blank'
                href={`https://www.heroku.com/deploy/?template=https://github.com/${
                  this.props.user.githubUsername
                }/${this.props.match.params.repoName}`}
                onClick={() =>
                  history.push(
                    `/success/profit/${this.props.match.params.repoName}`
                  )
                }
                className='button is-primary'
              >
                <span>Deploy</span>
              </a>
            ) : (
              <button
                className='button'
                onClick={() =>
                  history.push(
                    `/success/profit/${this.props.match.params.repoName}`
                  )
                }
              >
                Skip
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const connectedDeployment = connect(mapStateToProps, mapDispatchToProps)(
  Deployment
)

export default connectedDeployment
