import React, { Component } from 'react'
import firebase from 'firebase'
import axios from 'axios'

import logo from '../assets/logo.svg'
import './App.css'

const provider = new firebase.auth.GithubAuthProvider()

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      repoName: '',
      gitHubUsername: '',
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
      .post(
        `https://api.github.com/user/repos?access_token=${this.state
          .gitHubToken}`,
        data
      )
      .then(value => console.log(value))
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
      </div>
    )
  }
}

export default App
