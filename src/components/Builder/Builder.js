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
import GHCloner from './cloner.js'

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
      repoId: 1,
      repoName: this.props.match.params.name || 'teach-me-how-to-boilerplate',
      working: false,
      status: 'waiting to start',
      progress: '',
      content: ''
    }
    this.createRepo = this.createRepo.bind(this)
    this.changeRepoName = this.changeRepoName.bind(this)
    this.startCloner = this.startCloner.bind(this)
  }

  changeRepoName (e) {
    this.setState({ repoName: e.target.value })
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

  async startCloner (e) {
    e.preventDefault()
    const { githubUsername, githubToken } = this.props.user
    const { name, owner } = this.props.match.params
    this.setState({ working: true })
    const clone = new GHCloner(
      this.state.repoName,
      githubUsername,
      githubToken,
      name,
      owner
    )
    this.setState({ status: `${clone.status}` })
    const dirContent = await clone.getContents()
    this.setState({ status: `${clone.status}` })
    console.log(dirContent)
    this.setState({ content: dirContent })
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
            <form>
              <input
                className='input'
                type='text'
                defaultValue={this.state.repoName}
                name='GitHub Repo Name'
                onChange={this.changeRepoName}
                placeholder='what is your project called?'
              />
              <p className='help'>no-spaces</p>
              <button type='submit' onClick={this.startCloner}>
                Start Hyper Clone
              </button>
            </form>
          </div>
        </div>
        {this.state.working && (
          <div style={{ border: 'solid 1px black', padding: '10px' }}>
            status: {this.state.status}
            <br />
            progress: {this.state.progress}
            <br />
            content: {JSON.stringify(this.state.content)}
            <br />
          </div>
        )}
        <NavLink to={`/repos/${this.state.repoId}`}>
          <button className='button' onClick={this.createRepo}>
            Create Repo
          </button>
        </NavLink>
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
