import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import { actions } from './index.js'
import { components } from '../components.js'

const mapStateToProps = state => {
  return {
    ...state.Builder,
    ...state.App,
    ...state.List
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentRepo: (name, owner) => {
      return firebase
        .firestore()
        .collection('boilerplates')
        .where('name', '==', name)
        .where('owner.login', '==', owner)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            dispatch(actions.setCurrentRepo({ currentRepo: doc.data() }))
          )
        })
        .catch(console.error)
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

    this.startCloner = this.startCloner.bind(this)
  }

  startCloner (e) {
    e.preventDefault()
    this.setState({ working: true })
    this.setState({ content: `sending request to server` })
    const { githubToken, githubUsername } = this.props.user
    const { name, owner } = this.props.currentRepo
    axios
      .post('https://boilerplate-pro-server.herokuapp.com/github/hyperClone', {
        repoName: e.target.name.value,
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
    this.props.setCurrentRepo(
      this.props.match.params.name,
      this.props.match.params.owner
    )
  }

  render () {
    const repo = this.props.currentRepo
    const correctRepo = repo.name === this.props.match.params.name
    return !correctRepo ? (
      <section className='hero is-large'>
        <div className='hero-body'>
          <div className='container'>
            <components.Spinner />
          </div>
        </div>
      </section>
    ) : (
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
<<<<<<< HEAD
                name='name'
                defaultValue={this.props.repoName}
=======
                name='input'
                defaultValue={this.props.repoName}
                // onChange={evt => this.props.handleRepoName(evt.target.value)}
                placeholder={this.state.placeholder}
>>>>>>> master
              />
            </div>
            <p className='help'>name must contain no-spaces</p>
            {firebase.auth().currentUser ? (
              <button
                className='button'
                type='submit'
                disabled={this.state.working}
<<<<<<< HEAD
=======
                // onClick={this.startCloner}
>>>>>>> master
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
