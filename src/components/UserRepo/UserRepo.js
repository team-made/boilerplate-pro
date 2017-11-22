import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import TestIntegration from '../TestIntegration/TestIntegration.js'

const mapStateToProps = state => {
  return {
    ...state.UserRepo,
    ...state.Builder,
    ...state.App
  }
}

class UserRepo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userRepo: {}
    }
  }

  render () {
    return (
      <div>
        <div className='user-title'>
          <h1 className='title is-3'> User Repository Info</h1>
          <div />
          <div>
            <a
              href={`https://github.com/${this.props.user.githubUsername}/${this
                .props.repoName}`}
              className='button'
            >
              Visit created Rpo
            </a>
          </div>
          <button className='button'>To Continuous Integration!</button>
          <div>
            <Link to='/deploy' className='button'>
              To Deploy Page!
            </Link>
            <TestIntegration />
          </div>
        </div>
      </div>
    )
  }
}

const connectedUserRepo = connect(mapStateToProps)(UserRepo)

export default connectedUserRepo
