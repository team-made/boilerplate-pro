import React from 'react'
import { connect } from 'react-redux'
// import { NavLink, Link } from 'react-router-dom'
import { store } from '../components.js'
import { actions } from './index.js'
import axios from 'axios'
import TestIntegration from '../TestIntegration/TestIntegration.js'

const mapStateToProps = state => {
  return {
    ...state.UserRepo,
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserRepo: username => {
      const repoName = store.getState().Builder.repoName
      axios
        .get(`https://api.github.com/repos/${username}/${repoName}`)
        .then(repo => {
          dispatch(actions.userRepoAction({ repoData: repo }))
        })
    }
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
          <button
            className='button'
            onClick={() =>
              this.props.getUserRepo(this.props.user.githubUsername)}
          >
            Show User Repo Data
          </button>
          <h4>REPO Data</h4>
          <p>{JSON.stringify(this.props.repoData)}</p>
          <button className='button'>To Continuous Integration!</button>
          <TestIntegration />
        </div>
      </div>
    )
  }
}

const connectedUserRepo = connect(mapStateToProps, mapDispatchToProps)(UserRepo)

export default connectedUserRepo
