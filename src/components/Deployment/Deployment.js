import React from 'react'
import { connect } from 'react-redux'
import { components } from '../components'
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

const Deployment = props => {
  return (
    <div>
      <div className='container' style={{ maxWidth: '600px' }}>
        <br />
        <components.ServiceCard
          name='Heroku'
          logo='https://ludu-assets.s3.amazonaws.com/lesson-icons/KOLuHYOrXW8T324wQ4OM'
          handleSwitchState={state => console.log('state', state)}
          description={`Test and Deploy with Confidence. Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes!`}
        />
        <components.ServiceCard
          name='Firebase'
          logo='https://seeklogo.com/images/F/firebase-logo-402F407EE0-seeklogo.com.png'
          handleSwitchState={state => console.log('state', state)}
          description={`Test and Deploy with Confidence. Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes!`}
        />
        <components.ServiceCard
          name='AWS'
          logo='https://pbs.twimg.com/profile_images/907652118688829440/FrshWMKt.jpg'
          handleSwitchState={state => console.log('state', state)}
          description={`Test and Deploy with Confidence. Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes!`}
        />
        <components.ServiceCard
          name='Digital Ocean'
          logo='https://www.digitalocean.com/assets/media/logos-badges/png/DO_Logo_Vertical_Blue-6321464d.png'
          handleSwitchState={state => console.log('state', state)}
          description={`Test and Deploy with Confidence. Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes!`}
        />
        <a
          href={`https://www.heroku.com/deploy/?template=https://github.com/${
            props.user.githubUsername
          }/${props.match.params.repoName}`}
          className='button is-link'
          style={{ padding: '5px' }}
        >
          <span>Deploy</span>
        </a>
      </div>
    </div>
  )
}

const connectedDeployment = connect(mapStateToProps, mapDispatchToProps)(
  Deployment
)

export default connectedDeployment
