import React from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import { NavLink } from 'react-router-dom'

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
  const user = props.user
  return (
    <nav
      className='navbar is-fixed-top'
      style={{ height: '70px', boxShadow: '0px 0px 4px black' }}
    >
      <div className='navbar-brand'>
        <NavLink to='/' className='navbar-item'>
          <h2 className='subtitle' style={{ letterSpacing: '1px' }}>
            Boilerplate<strong style={{ fontWeight: 'bold' }}>Pro</strong>
          </h2>
        </NavLink>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-end'>
          {user.email ? (
            <div className='account navbar-item has-dropdown is-hoverable'>
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
                  <a className='button is-light is-outlined' onClick={signIn}>
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

export default Navbar
