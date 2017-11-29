import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { actions } from './index.js'
import './Success.css'

// import TestIntegration from '../TestIntegration/TestIntegration.js'

const mapStateToProps = state => {
  return {
    ...state.Success,
    ...state.Builder,
    ...state.App,
    ...state.SingleRepo,
    ...state.List
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentRepo: (user, repoName) => {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('repos')
        .doc(repoName)
        .get()
        .then(doc =>
          dispatch(actions.setCurrentRepo({ currentRepo: doc.data() }))
        )
    }
  }
}

class Success extends React.Component {
  componentDidMount () {
    console.log('success', this.props)
    this.props.user.uid &&
      this.props.setCurrentRepo(
        this.props.user,
        this.props.match.params.repoName
      )
  }

  render () {
    return (
      <div>
        <div className='user-title'>
          <h1 className='title is-3'>Success!!</h1>
          <p>Your app: {this.props.match.params.repoName} has been built!</p>
          <br />
          <div>
            <Link to='/testintegration' className='button'>
              Would you like to integrate your app with Travis CI?
            </Link>
          </div>
          <br />
          <div>
            <Link to='/testintegration' className='button'>
              or just skip straight to deployment?
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const connectedSuccess = connect(mapStateToProps, mapDispatchToProps)(Success)

export default connectedSuccess
