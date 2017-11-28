import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import { actions } from './index.js'
// import { history, components } from '../components.js'

const mapStateToProps = state => {
  return {
    ...state.Builder,
    ...state.App,
    ...state.List
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleRepoName: value => {
      dispatch(
        actions.repoNameAction({
          repoName: value
        })
      )
    }
  }
}

class Builder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      warningText: '',
      building: false,
      working: false,
      status: 'waiting to start',
      progress: '',
      content: '',
      placeholder: `Repo Name (ex. '${this.props.repoName}')`
    }

    const name =
      (this.props.match && this.props.match.params.name) ||
      'teach-me-how-to-boilerplate'
    props.handleRepoName(name)

    this.startCloner = this.startCloner.bind(this)
  }

  startCloner (e) {
    e.preventDefault()
    this.setState({ working: true })
    this.setState({ content: `sending request to server` })
    const githubToken = this.props.user.githubToken
    const githubUsername = this.props.user.githubUsername
    const { name, owner } = this.props.match.params
    axios
      .post('https://boilerplate-pro-server.herokuapp.com/github/hyperClone', {
        repoName: this.props.repoName,
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
    console.log('props', this.props)
    return (
      <div className='container'>
        <br />
        <h1 className='subtitle is-2'>Builder</h1>
        <label className='label'>Repo Name</label>
        <div className='field'>
          <form onSubmit={this.startCloner}>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='input'
                defaultValue={this.props.repoName}
                // onChange={evt => this.props.handleRepoName(evt.target.value)}
                placeholder={this.state.placeholder}
              />
            </div>
            <p className='help'>name must contain no-spaces</p>
            {firebase.auth().currentUser ? (
              <button
                className='button'
                type='submit'
                disabled={this.state.working}
                // onClick={this.startCloner}
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
      </div>
    )
  }
}

const connectedBuilder = connect(mapStateToProps, mapDispatchToProps)(Builder)

export default connectedBuilder
