import React from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import { NavLink } from 'react-router-dom'

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

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = { activeDropdown: false }
  }

  render () {
    const user = this.props.user
    return (
      <nav
        className='navbar is-fixed-top'
        style={{ height: '52px', boxShadow: '0px 0px 4px black' }}
      >
        <div className='navbar-brand'>
          <a className='navbar-item' onClick={() => history.push('/')}>
            <h2>Boilerplate Pro</h2>
          </a>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-end'>
            {user.email ? (
              <div
                className={`navbar-item has-dropdown ${this.state
                  .activeDropdown && 'is-active'}`}
                onClick={() =>
                  this.setState(state => ({
                    activeDropdown: !state.activeDropdown
                  }))
                }
              >
                <a className='navbar-link'>Account</a>
                <div className='navbar-dropdown is-right'>
                  <NavLink to='/dashboard' className='navbar-item'>
                    Dashboard
                  </NavLink>
                  <a className='navbar-item'>Starred Repos</a>
                  <a className='navbar-item'>Past Builds</a>
                  <hr className='navbar-divider' />
                  <a className='navbar-item' onClick={signOut}>
                    Sign Out
                  </a>
                </div>
              </div>
            ) : (
              <div className='navbar-item'>
                <div className='field is-grouped'>
                  <p className='control'>
                    <a className='button is-dark' onClick={signIn}>
                      <span className='icon is-medium'>
                        <i className='fa fa-github' />
                      </span>
                      <span>Sign In with Github</span>
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
