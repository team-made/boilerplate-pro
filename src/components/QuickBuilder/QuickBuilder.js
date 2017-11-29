import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import { components, history } from '../components'
// import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.QuickBuilder,
    ...state.SingleRepo,
    ...state.Builder,
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}
class QuickBuilder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      warningText: '',
      working: false,
      progress: '',
      progBarValue: 0,
      content: '',
      status: '',
      repoName: '',
      placeholder: `Repo Name (ex. '${this.props.currentRepo.name}')`
    }
    this.startCloner = this.startCloner.bind(this)
  }

  startCloner (e) {
    console.log('owner', this.props.currentRepo)
    e.preventDefault()
    this.setState({
      working: true,
      content: `sending request to server`,
      repoName: e.target.input.value
    })
    const { githubToken, githubUsername } = this.props.user
    const { name, owner } = this.props.currentRepo

    this.props.user.uid &&
      firebase
        .firestore()
        .collection('users')
        .doc(this.props.user.uid)
        .collection('repos')
        .doc(e.target.input.value)
        .onSnapshot(doc => {
          console.log('USER SNAPSHOT', doc.exists && doc.data())
          this.setState({ content: doc.exists && doc.data().status })
        })
    axios
      // .post('https://boilerplate-pro-server.herokuapp.com/github/hyperClone', {
      .post('http://localhost:9090/github/hyperClone', {
        repoName: e.target.input.value,
        githubUsername: githubUsername,
        githubToken: githubToken,
        name: name,
        owner: owner.login
      })
      .then(result => {
        if (result.status === 200) {
          this.setState({ content: `Server received request to clone repo` })
        } else {
          this.setState({ content: `There was an problem - ${result.status}` })
          this.setState({ warningText: `${result.data}` })
        }
      })
  }

  render () {
    if (this.state.content === 'DONE') {
      history.push(`/success/integration/${this.state.repoName}`)
    }
    return (
      <div className='field' style={{ width: '400px' }}>
        {!this.state.working ? (
          <form onSubmit={this.startCloner}>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='input'
                placeholder={this.state.placeholder}
              />
            </div>
            <p className='help'>name must contain no-spaces</p>
            {firebase.auth().currentUser ? (
              <button className='button' type='submit'>
                Start HyperClone™
              </button>
            ) : (
              <div>Sign in to build!</div>
            )}
          </form>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <components.Spinner />
            </div>
            <br />
            {this.state.content}
            {this.state.warningText && (
              <p className='help'>{this.state.warningText}</p>
            )}
            <br />
            <br />
          </div>
        )}
      </div>
    )
  }
}

const connectedQuickBuilder = connect(mapStateToProps, mapDispatchToProps)(
  QuickBuilder
)

export default connectedQuickBuilder
