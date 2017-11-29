import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { actions } from './index.js'
import { components } from '../components.js'
const mapStateToProps = (state) => {
  return {
    ...state.PreviousBuilds,
    ...state.App
  }
}
const mapDispatchToProps = (dispatch) => {
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
class PreviousBuilds extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        {this.props.userData.userData && this.props.userData.userData.map(userRepo => {
          return (
            <components.CreatedRepoView key={userRepo.repoId} userRepo={userRepo} userName={this.props.user.githubUsername} />
          )
        })}

      </div>
    )
  }
}

const connectedPreviousBuilds = connect(mapStateToProps, mapDispatchToProps)(PreviousBuilds)

export default connectedPreviousBuilds
