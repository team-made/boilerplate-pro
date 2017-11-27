import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { actions } from './index.js'
import CreatedRepoView from '../CreatedRepoView/CreatedRepoView.js'
const mapStateToProps = state => {
  return {
    ...state.Dashboard,
    ...state.App,
    ...state.Builder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUser: (uid) => {
      firebase.firestore()
        .collection('users')
        .doc(uid)
        .collection('repos')
        .get()
        .then(querySnapshot => {
          let userData = Array.from(querySnapshot.docs).map(doc => doc.data())
          dispatch(
            actions.userDataAction({
              userData
            })
          )
        })
    }
  }
}

class Dashboard extends React.Component {
  componentDidMount () {
    console.log('updated', this.props.user.uid)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid)
      }
    })
  }
  render () {
    console.log(this.props.userData)
    return (
      <div className='container'>
        <div className='tabs is-centered'>
          <ul>
            <li>
              <a>Account</a>
            </li>
            <li className='is-active'>
              <a>Previous Builds</a>
            </li>
            <li>
              <a>Starred Boilerplates</a>
            </li>
            <li>
              <a>Saved Configurations</a>
            </li>
          </ul>
        </div>
        <div>
          {this.props.userData.userData && this.props.userData.userData.map(userRepo => {
            return (
              <CreatedRepoView userRepo={userRepo} />
            )
          })}
        </div>

      </div>
    )
  }
}

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default connectedDashboard
