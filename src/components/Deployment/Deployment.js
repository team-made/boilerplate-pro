import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { history, components } from '../components'
import { actions } from './index.js'

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
            logo='https://ludu-assets.s3.amazonaws.com/lesson-icons/KOLuHYOrXW8T324wQ4OM'
            handleSwitchState={event =>
              this.setState({ heroku: !this.state.heroku })
            }
            description='Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.'
          />
          <components.ServiceCard
            name='Firebase'
            logo='https://seeklogo.com/images/F/firebase-logo-402F407EE0-seeklogo.com.png'
            handleSwitchState={event =>
              this.setState({ firebase: !this.state.firebase })
            }
            description="Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business."
          />
          <components.ServiceCard
            name='AWS'
            logo='https://pbs.twimg.com/profile_images/907652118688829440/FrshWMKt.jpg'
            handleSwitchState={event => this.setState({ aws: !this.state.aws })}
            description='Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services. Free to join, pay only for what you use.'
          />
          <components.ServiceCard
            name='Digital Ocean'
            logo='https://www.digitalocean.com/assets/media/logos-badges/png/DO_Logo_Vertical_Blue-6321464d.png'
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
              <form
                target='_blank'
                action={`https://www.heroku.com/deploy/?template=https://github.com/${
                  this.props.user.githubUsername
                }/${this.props.match.params.repoName}`}
              >
                <button type='submit' className='button is-primary'>
                  <span>Deploy</span>
                </button>
              </form>
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
