import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { actions } from './index.js'
import './Dashboard.css'
import { components } from '../components.js'

const mapStateToProps = state => {
  return {
    ...state.Dashboard,
    ...state.App,
    ...state.Builder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUser: uid => {
      firebase
        .firestore()
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
  constructor (props) {
    super(props)
    this.state = {
      active: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }
  handleClick (e) {
    this.setState({
      active: e.target.innerHTML
    })
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid)
      }
    })
  }
  renderContent () {
    if (this.state.active === 'Bookmarked Boilerplates') {
      return <components.BookmarkedBuilds />
    } else if (this.state.active === 'Previous Builds') {
      return <components.PreviousBuilds />
    } else {
      return <components.Account />
    }
  }
  render () {
    // after dash nav check state to render components
    return (
      <div className='container'>
        <div className='tabs is-centered'>
          <ul>
            <div className='Account' onClick={this.handleClick}>
              <li>
                <a>Account</a>
              </li>
            </div>
            <div className='Prev' onClick={this.handleClick}>
              <li>
                <a>Previous Builds</a>
              </li>
            </div>
            <div className='Bookmarks' onClick={this.handleClick}>
              <li>
                <a>Bookmarked Boilerplates</a>
              </li>
            </div>
          </ul>
        </div>
        <div>{this.renderContent()}</div>
      </div>
    )
  }
}

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default connectedDashboard
