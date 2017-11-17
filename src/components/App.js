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
      .post(`https://api.github.com/user/repos?access_token=${this.state.gitHubToken}`, data)
      .then((value) => console.log(value))
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
