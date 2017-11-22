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
import { history } from '../components.js'
// import GHCloner from './cloner.js'

const mapStateToProps = state => {
  return {
    ...state.Builder,
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleRepoName: value => {
      dispatch(
        actions.repoNameAction({
          repoName: value
        })
      )
    }
  }
}

class Builder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      warningText: '',
      building: false,
      working: false,
      status: 'waiting to start',
      progress: '',
      content: ''
    }

    const name =
      (this.props.match && this.props.match.params.name) ||
      'teach-me-how-to-boilerplate'
    props.handleRepoName(name)

    this.createRepo = this.createRepo.bind(this)
    this.startCloner = this.startCloner.bind(this)
  }

  createRepo () {
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
    this.setState({ building: true })
    axios
      .post(`https://api.github.com/user/repos`, data, config)
      .then(() => {
        return axios
          .put(
            `https://api.github.com/repos/${githubUsername}/${repoName}/contents/index.html`,
            indexHTMLFileCreator(),
            config
          )
          .then(() =>
            axios.put(
              `https://api.github.com/repos/${githubUsername}/${repoName}/contents/api.json`,
              apiJSONFileCreator(),
              config
            )
          )
          .then(() =>
            axios.put(
              `https://api.github.com/repos/${githubUsername}/${repoName}/contents/.travis.yml`,
              yamlFileCreator(),
              config
            )
          )
      })
      .then(() => history.push(`/repos/${this.state.repoId}`))
      .catch(
        err =>
          console.error(err) ||
          this.setState({
            building: false,
            warningText: `${err.response.data.message}
              ${err.response.data.errors[0].message}`
          })
      )
  }

  async startCloner (e) {
    e.preventDefault()
    const { githubUsername, githubToken } = this.props.user
    const { name, owner } = this.props.match.params
    this.setState({ working: true })
    // const clone = new GHCloner(
    //   this.props.repoName,
    //   githubUsername,
    //   githubToken,
    //   name,
    //   owner
    // )
    // console.log(clone.progress)
    // this.setState({ status: `${clone.status}` })

    // const newRepo = await clone.createRepo()
    // console.log("create repo",newRepo)
    // const dirContent = await clone.readAndWriteFile('gradlew')
    // console.log("clone file",dirContent)

    // this.setState({ status: `${clone.status}` })
    // this.setState({ content: dirContent })
  }

  render () {
    return (
      <div>
        <div className='field' style={{ width: '400px', margin: '0 auto' }}>
          <br />
          <h1 className='subtitle is-2'>Builder</h1>
          <label className='label'>Repo Name</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              name='GitHub Repo Name'
              value={this.props.repoName}
              onChange={evt => this.props.handleRepoName(evt.target.value)}
              placeholder='Text input'
            />
          </div>
          <p className='help'>name must contain no-spaces</p>
          <button type='submit' onClick={this.startCloner}>
            Start Hyper Clone
          </button>

          {this.state.building ? (
            <div className='spinner'>
              <div className='bounce1' />
              <div className='bounce2' />
              <div className='bounce3' />
            </div>
          ) : firebase.auth().currentUser ? (
            <button className='button' onClick={this.createRepo}>
              Create Repo
            </button>
          ) : (
            <button className='button'>Sign in to build!</button>
          )}

          {this.state.warningText && (
            <p className='help'>{this.state.warningText}</p>
          )}

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
        </div>
      </div>
    )
  }
}

const connectedBuilder = connect(mapStateToProps, mapDispatchToProps)(Builder)

export default connectedBuilder
