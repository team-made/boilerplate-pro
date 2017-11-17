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
      username: ''
    }
  }

  signIn () {
    firebase
      .auth()
      .signInWithPopup(provider.addScope('public_repo'))
      .then(result => {
        console.log(result)
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

  createRepo () {
    let repoName = this.state.repoName
    let data = {
      'name': {repoName},
      'description': 'Test for boilerplate-pro',
      'homepage': 'https://github.com',
      'private': false,
      'has_issues': true,
      'has_projects': true,
      'has_wiki': true
    }
    axios.post(`https://api.github.com/users/${this.state.username}/repos`, data)
      .then(value => console.log(value))
      .catch(err => console.error(err))
  }

  handleRepoName (event) {
    this.setState({repoName: event.target.value})
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Boilerplate Pro</h1>
        </header>
        <p className='App-intro'>Login or Signup</p>
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signOut}>Sign Out</button>
        <form className='create-repo'>
          <input type='text' name='GitHub Repo Name' onChange={this.handleRepoName} placeholder='no-spaces' />
          <input type='submit' value='Create Your GitHub Repo' onSubmit={this.createRepo} />
        </form>
      </div>
    )
  }
}

export default App
