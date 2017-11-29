import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
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
      content: '',
      placeholder: `Repo Name (ex. '${this.props.currentRepo.name}')`
    }
    this.startCloner = this.startCloner.bind(this)
  }

  startCloner (e) {
    e.preventDefault()
    console.log('input', e.target.input.value)
    this.setState({ working: true })
    this.setState({ content: `sending request to server` })
    const { githubToken, githubUsername } = this.props.user
    const { name, owner } = this.props.currentRepo
    this.props.user.uid &&
      firebase
        .firestore()
        .collection('users')
        .doc(this.props.user.uid)
        .collection('repos')
        .doc(e.target.input.value)
        .onSnapshot(doc =>
          console.log('USER SNAPSHOT', doc.exists && doc.data())
        )
    axios
      .post('https://boilerplate-pro-server.herokuapp.com/github/hyperClone', {
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

  componentDidMount () {
    console.log(this.props.repoName)
  }

  render () {
    return (
      <div className='field' style={{ width: '400px' }}>
        {!this.state.working ? (
          <form onSubmit={this.startCloner}>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='input'
                // defaultValue={this.props.currentRepo.name}
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
          <div style={{ border: 'solid 1px black', padding: '10px' }}>
            <span style={{ fontWeight: 800 }}>{this.state.content}</span>
            <br />
            {this.state.progress}
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
