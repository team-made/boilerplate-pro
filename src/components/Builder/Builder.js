import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import {
  appJSONFileCreator,
  indexHTMLFileCreator,
  yamlFileCreator
} from './FileGen.js'
import { actions } from './index.js'
import { history, components } from '../components.js'

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
            `https://api.github.com/repos/${githubUsername}/${
              repoName
            }/contents/index.html`,
            indexHTMLFileCreator(),
            config
          )
          .then(() =>
            axios.put(
              `https://api.github.com/repos/${githubUsername}/${
                repoName
              }/contents/app.json`,
              appJSONFileCreator(),
              config
            )
          )
          .then(() =>
            axios.put(
              `https://api.github.com/repos/${githubUsername}/${
                repoName
              }/contents/.travis.yml`,
              yamlFileCreator(),
              config
            )
          )
      })
      .then(() => history.push(`/repos/${this.state.repoId}`))
      .catch(
        err => console.error(err)
        // ||
        // this.setState({
        //   building: false,
        //   warningText: `${err.response.data.message}
        //     ${err.response.data.errors[0].message}`
        // })
      )
  }

  async startCloner (e) {
    e.preventDefault()
    this.setState({ working: true })
    this.setState({ content: `sending request to server` })
    const githubToken = this.props.user.githubToken
    const githubUsername = this.props.user.githubUsername
    const { name, owner } = this.props.match.params
    const result = await axios
      .post('https://boilerplate-pro-server.herokuapp.com/github/hyperClone', {
        repoName: this.props.repoName,
        githubUsername: githubUsername,
        githubToken: githubToken,
        name: name,
        owner: owner
      })
      .then(result => {
        console.log('result:', result)
        if (result.status === 200) {
          this.setState({ content: `Server received request to clone repo` })
        } else {
          this.setState({ content: `There was an problem - ${result.status}` })
          this.setState({ warningText: `${result.data}` })
        }
      })
  }

  render () {
    return (
      <div>
        <div className='container'>
          <br />
          <h1 className='subtitle is-2'>Builder</h1>
          <label className='label'>Repo Name</label>
          <div className='field'>
            <form>
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
              <button
                className='button'
                type='submit'
                disabled={this.state.working}
                onClick={this.startCloner}
              >
                Start HyperClone™
              </button>
            </form>

            {this.state.building ? (
              <components.Spinner />
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
                <span style={{ fontWeight: 800 }}>{this.state.content}</span>
                <br />
                {this.state.progress}
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const connectedBuilder = connect(mapStateToProps, mapDispatchToProps)(Builder)

export default connectedBuilder
