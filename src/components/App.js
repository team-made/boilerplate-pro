import React, { Component } from 'react'
import firebase from 'firebase'
import axios from 'axios'

import logo from '../assets/logo.svg'
import './App.css'

const provider = new firebase.auth.GithubAuthProvider()
const dummyHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body><h1>MY USER APP</h1></body><footer></footer></html>'
const dummyApiJSON = {
  'name': 'Ruby on Rails',
  'description': 'A template for getting started with the popular Ruby framework.'}.toString()

const indexHTMLFileCreator = function (content) {
  let contentObj = {
    'message': 'feat(HTML):testing github api file creation',
    'committer': {
      'name': 'Mitchell Stewart',
      'email': 'mitchellwstewart@gmail.com'
    },
    'content': `${window.btoa(dummyHtml)}`
  }
  return contentObj
}

const apiJSONFileCreator = function () {
  console.log('here', dummyApiJSON)
  let contentObj = {
    'message': 'f(apiJSON):testing github api file creation',
    'committer': {
      'name': 'Mitchell Stewart',
      'email': 'mitchellwstewart@gmail.com'
    },
    'content': `${window.btoa(dummyApiJSON)}`
  }
  return contentObj
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      repoName: '',
      gitHubUsername: '',
      name: '',
      email: '',
      gitHubToken: '',
      gitHubUrl: ''
    }
    this.handleRepoName = this.handleRepoName.bind(this)
    this.createRepo = this.createRepo.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  signIn () {
    firebase
      .auth()
      .signInWithPopup(provider.addScope('public_repo'))
      .then(result => {
        console.log(result)
        this.setState({
          gitHubUsername: result.additionalUserInfo.username,
          email: result.user.email,
          name: result.user.name,
          gitHubToken: result.credential.accessToken,
          gitHubUrl: result.additionalUserInfo.profile.repos_url
        })
      })
      .catch(err => {
        console.log('Sign in error:', err)
      })
  }

  signOut () {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signed out')
      })
      .catch(err => {
        console.log('error with signout', err)
      })
  }

  createRepo (event) {
    event.preventDefault()
    let repoName = this.state.repoName
    let data = {
      name: repoName,
      description: 'Test for boilerplate-pro',
      homepage: 'https://github.com',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    }
    axios
      .post(`https://api.github.com/user/repos?access_token=${this.state.gitHubToken}`, data)
      .then(() => {
        axios.put(`https://api.github.com/repos/${this.state.gitHubUsername}/${this.state.repoName}/contents/index.html?access_token=${this.state.gitHubToken}`, indexHTMLFileCreator())
        axios.put(`https://api.github.com/repos/${this.state.gitHubUsername}/${this.state.repoName}/contents/api.json?access_token=${this.state.gitHubToken}`, apiJSONFileCreator())
      })
      .catch(err => console.error(err))
  }

  handleRepoName (event) {
    this.setState({ repoName: event.target.value })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Boilerplate Pro</h1>
        </header>
        <p className='App-intro'>Login or Signup</p>
        <button className='button is-primary' onClick={this.signIn}>
          Sign In
        </button>
        <button className='button is-info' onClick={this.signOut}>
          Sign Out
        </button>
        <form className='create-repo' onSubmit={this.createRepo}>
          <input
            type='text'
            name='GitHub Repo Name'
            onChange={this.handleRepoName}
            placeholder='no-spaces'
          />
          <input type='submit' value='Create Your GitHub Repo' />
        </form>
      </div>
    )
  }
}

export default App
