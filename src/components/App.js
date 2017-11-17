import React, { Component } from 'react'
import firebase from 'firebase'

import logo from '../assets/logo.svg'
import './App.css'

const provider = new firebase.auth.GithubAuthProvider()

class App extends Component {
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
      </div>
    )
  }
}

export default App
