import React from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import { history } from '../components.js'

const provider = new firebase.auth.GithubAuthProvider()

const signIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider.addScope('public_repo'))
    .then(result => {
      firebase
        .firestore()
        .collection('users')
        .doc(result.user.uid)
        .set({
          uid: result.user.uid,
          email: result.user.email,
          githubToken: result.credential.accessToken,
          githubUsername: result.additionalUserInfo.username
        })
    })
    .catch(err => {
      console.error('Sign in error: ', err)
    })
}
const signOut = () => {
  firebase
    .auth()
    .signOut()
    .catch(err => {
      console.error('Sign out error:', err)
    })
}

const Navbar = props => {
  return (
    <nav
      className='navbar is-fixed-top'
      style={{ height: '52px', boxShadow: '0px 0px 4px black' }}
    >
      <div className='navbar-brand'>
        <div
          className='navbar-item'
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/')}
        >
          <span>Boilerplate Pro</span>
        </div>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-end'>
          <a
            className='navbar-item'
            href='https://github.com/team-made/boilerplate-pro'
          >
            <span className='icon'>
              <i className='fa fa-lg fa-github' />
            </span>
          </a>
          <div className='navbar-item'>
            <div className='field is-grouped'>
              <p className='control'>
                {props.user.email ? (
                  <button className='button' onClick={signOut}>
                    Sign Out
                  </button>
                ) : (
                  [
                    <button key='1' className='button' onClick={signIn}>
                      Sign In
                    </button>,
                    <button
                      key='2'
                      className='button is-primary'
                      onClick={signIn}
                    >
                      Sign Up
                    </button>
                  ]
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
