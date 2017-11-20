import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import {
  apiJSONFileCreator,
  indexHTMLFileCreator,
  yamlFileCreator
} from './FileGen.js'
import { actions } from './index.js'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    ...state.Builder,
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleRepoName: event => {
      dispatch(
        actions.repoNameAction({
          repoName: event.target.value
        })
      )
    }
  }
}

class Builder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      repoId: 1
    }
    this.createRepo = this.createRepo.bind(this)
  }

  async createRepo () {
    const repoName = this.props.repoName
    const { githubUsername, githubToken } = this.props.user
    const config = { headers: { Authorization: `token ${githubToken}` } }
    const data = {
      name: repoName,
      description: 'Test for boilerplate-pro',
      homepage: 'https://github.com',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    }
    await axios.post(`https://api.github.com/user/repos`, data, config)

    await axios.put(
      `https://api.github.com/repos/${githubUsername}/${repoName}/contents/index.html`,
      indexHTMLFileCreator(),
      config
    )
    await axios.put(
      `https://api.github.com/repos/${githubUsername}/${repoName}/contents/api.json`,
      apiJSONFileCreator(),
      config
    )
    await axios
      .put(
        `https://api.github.com/repos/${githubUsername}/${repoName}/contents/.travis.yml`,
        yamlFileCreator(),
        config
      )
      .catch(err => console.error(err))
  }

  getCurrentUser () {
    console.log('currentUser:', firebase.auth().currentUser)
  }

  render () {
    console.log('props on builder:', this.props)
    return (
      <div>
        <div className='field' style={{ width: '400px', margin: '0 auto' }}>
          <br />
          <h1 className='title'>Builder</h1>
          <label className='label'>Repo Name</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              value={`${this.props.match.params.reponame}`}
              name='GitHub Repo Name'
              onChange={this.props.handleRepoName}
              placeholder='Text input'
            />
          </div>
          <p className='help'>no-spaces</p>

          <NavLink to={`/repos/${this.state.repoId}`}>
            <button className='button' onClick={this.createRepo}>
              Create Repo
            </button>
          </NavLink>
        </div>
        {/* Eventually link to actual repo will go here */}

        <button className='button' onClick={this.getCurrentUser}>
          Get Current user
        </button>
        <button className='button' onClick={this.getUserRepo}>
          Show User Repos
        </button>
      </div>
    )
  }
}

const connectedBuilder = connect(mapStateToProps, mapDispatchToProps)(Builder)

export default connectedBuilder
