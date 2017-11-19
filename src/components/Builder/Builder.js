import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import axios from 'axios'

import { actions } from './index.js'
import { store } from '../components.js'

const mapStateToProps = state => {
  return {
    ...state.Builder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}

const dummyHtml =
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body><h1>MY USER APP</h1></body><footer></footer></html>'
const dummyApiJSON = JSON.stringify({
  name: 'Rubils',
  description: 'A template.'
})

const indexHTMLFileCreator = function (content) {
  let contentObj = {
    message: 'feat(HTML):testing github api file creation',
    committer: {
      name: 'Mitchell Stewart',
      email: 'mitchellwstewart@gmail.com'
    },
    content: `${window.btoa(dummyHtml)}`
  }
  return contentObj
}

const apiJSONFileCreator = function () {
  let contentObj = {
    message: 'f(apiJSON):testing github api file creation',
    committer: {
      name: 'Mitchell Stewart',
      email: 'mitchellwstewart@gmail.com'
    },
    content: `${window.btoa(dummyApiJSON)}`
  }
  console.log('here', contentObj)
  return contentObj
}
class Builder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      repoName: ''
    }
    this.handleRepoName = this.handleRepoName.bind(this)
    this.createRepo = this.createRepo.bind(this)
  }

  async createRepo () {
    const repoName = this.state.repoName
    const { username } = store.getState().Navbar.additionalUserInfo
    const { accessToken } = store.getState().Navbar.credential
    const config = { headers: { Authorization: `token ${accessToken}` } }
    const data = {
      name: repoName,
      description: 'Test for boilerplate-pro',
      homepage: 'https://github.com',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    }
    await axios
      .post(`https://api.github.com/user/repos`, data, config)

    await axios.put(
      `https://api.github.com/repos/${username}/${repoName}/contents/index.html`,
      indexHTMLFileCreator(),
      config
    )
    await axios.put(
      `https://api.github.com/repos/${username}/${repoName}/contents/api.json`,
      apiJSONFileCreator(),
      config
    )
      .catch(err => console.error(err))
  }
  handleRepoName (event) {
    this.setState({ repoName: event.target.value })
  }

  getCurrentUser () {
    console.log(
      'currentUser:',
      'token: ' + store.getState().Navbar.credential.accessToken,
      firebase.auth().currentUser
    )
  }
  render () {
    return (
      <div>
        <div
          className='field'
          onSubmit={this.createRepo}
          style={{ width: '400px', margin: '0 auto' }}
        >
          <label className='label'>Repo Name</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              name='GitHub Repo Name'
              onChange={this.handleRepoName}
              placeholder='Text input'
            />
          </div>
          <p className='help'>no-spaces</p>
          <button className='button' onClick={this.createRepo}>
            Create Repo
          </button>
        </div>
        {/* Eventually link to actual repo will go here */}
        <a
          className='button is-link'
          style={{ padding: '5px' }}
          href={`https://www.heroku.com/deploy/?template=https://github.com/heroku/node-js-getting-started`}
        >
          <span>Deploy to Heroku</span>
        </a>
        <button onClick={this.getCurrentUser}>Get Current user</button>
      </div>
    )
  }
}

const connectedBuilder = connect(mapStateToProps, mapDispatchToProps)(Builder)

export default connectedBuilder
