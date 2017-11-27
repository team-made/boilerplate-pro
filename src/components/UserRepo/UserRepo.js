import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

// import TestIntegration from '../TestIntegration/TestIntegration.js'

const mapStateToProps = state => {
  return {
    ...state.UserRepo,
    ...state.Builder,
    ...state.App,
    ...state.SingleRepo
  }
}

class UserRepo extends React.Component {
  componentDidMount () {
    console.log('firebase', firebase)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('repos')
          .doc(this.props.repoName)
          .set({
            name: this.props.repoName,
            description: this.props.currentRepo.description,
            githubLink: `https://github.com/${this.props.user.githubUsername}/${this
              .props.repoName}`
          })
          .then(data => console.log('successful', data))
      }
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      userRepo: {}
    }
  }

  render () {
    return (
      <div>
        <div className='user-title'>
          <h1 className='title is-3'> User Repository Info</h1>
          <div />
          <div>
            <a
              href={`https://github.com/${this.props.user.githubUsername}/${this
                .props.repoName}`}
              className='button'
            >
              Visit created Rpo
            </a>
          </div>
          <Link to='/testintegration' className='button'>
         To Integration and Deployment!
          </Link>
        </div>
      </div>
    )
  }
}

const connectedUserRepo = connect(mapStateToProps)(UserRepo)

export default connectedUserRepo
