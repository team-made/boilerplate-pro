import React, { Component } from 'react'
import axios from 'axios'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import firebase from 'firebase'

import './App.css'

import { components, history, store } from '../components.js'

const dummyHtml =
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body><h1>MY USER APP</h1></body><footer></footer></html>'
const dummyApiJSON = JSON.stringify({
  name: 'Ruby on Rails',
  description: 'A template for getting started with the popular Ruby framework.'
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
  console.log('here', dummyApiJSON)
  let contentObj = {
    message: 'f(apiJSON):testing github api file creation',
    committer: {
      name: 'Mitchell Stewart',
      email: 'mitchellwstewart@gmail.com'
    },
    content: `${window.btoa(dummyApiJSON)}`
  }
  return contentObj
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repoName: ''
    }
    this.handleRepoName = this.handleRepoName.bind(this)
    this.createRepo = this.createRepo.bind(this)
  }

  createRepo () {
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

    axios
      .post(`https://api.github.com/user/repos`, data, config)
      .then(() => {
        axios.put(
          `https://api.github.com/repos/${username}/${repoName}/contents/index.html`,
          indexHTMLFileCreator(),
          config
        )
        axios.put(
          `https://api.github.com/repos/${username}/${repoName}/contents/api.json`,
          apiJSONFileCreator(),
          config
        )
      })
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
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className='App'>
            <components.Navbar />
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
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
