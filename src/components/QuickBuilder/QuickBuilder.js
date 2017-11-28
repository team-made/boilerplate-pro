import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
// import { actions } from './index.js'

const mapStateToProps = (state) => {
  return {
    ...state.QuickBuilder,
    ...state.SingleRepo,
    ...state.Builder,
    ...state.App
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
class QuickBuilder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      warningText: '',
      building: false,
      working: false,
      status: 'waiting to start',
      progress: '',
      content: '',
      placeholder: `Repo Name (ex. '${this.props.currentRepo.name}')`
    }
    this.startCloner = this.startCloner.bind(this)
  }

  startCloner (e) {
    e.preventDefault()
    this.setState({ working: true })
    this.setState({ content: `sending request to server` })
    const githubToken = this.props.user.githubToken
    const githubUsername = this.props.user.githubUsername
    const name = this.props.currentRepo.name
    const owner = this.props.currentRepo.owner.login
    axios
      .post('https://boilerplate-pro-server.herokuapp.com/github/hyperClone', {
        repoName: e.target.input.value,
        githubUsername: githubUsername,
        githubToken: githubToken,
        name: name,
        owner: owner
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
    return (
      <div className='field' style={{width: '400px'}}>
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
            <button
              className='button'
              type='submit'
              disabled={this.state.working}
            >
              Start HyperClone™
            </button>
          ) : (
            <div>Sign in to build!</div>
          )}
        </form>
        {this.state.warningText && (
          <p className='help'>{this.state.warningText}</p>
        )}

        {this.state.working && (
          <div style={{ border: 'solid 1px black', padding: '10px' }}>
            <span style={{ fontWeight: 800 }}>{this.state.content}</span>
            <br />
            {this.state.progress}
            <br />
            <br />
          </div>
        )}
      </div>
    )
  }
}

const connectedQuickBuilder = connect(mapStateToProps, mapDispatchToProps)(QuickBuilder)

export default connectedQuickBuilder
