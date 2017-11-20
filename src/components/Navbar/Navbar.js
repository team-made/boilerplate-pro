import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { history } from '../components.js'
import { actions } from './index.js'

const provider = new firebase.auth.GithubAuthProvider()

const mapStateToProps = state => {
  return {
    ...state.Navbar,
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signIn: () => {
      firebase
        .auth()
        .signInWithPopup(provider.addScope('public_repo'))
        .then(result => {
          dispatch(
            actions.signIn({
              user: result.user,
              credential: result.credential,
              additionalUserInfo: result.additionalUserInfo
            })
          )
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
            .then(snap => console.log(snap))
        })
        .catch(err => {
          console.log('Sign in error: ', err)
        })
    },
    signOut: () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('signed out')
          dispatch(actions.signOut())
        })
        .catch(err => {
          console.log('Sign out error:', err)
        })
    }
  }
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
                {props.user ? (
                  <button className='button' onClick={props.signOut}>
                    Sign Out
                  </button>
                ) : (
                  [
                    <button key='1' className='button' onClick={props.signIn}>
                      Sign In
                    </button>,
                    <button
                      key='2'
                      className='button is-primary'
                      onClick={props.signIn}
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

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default connectedNavbar
