import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import { actions } from './index.js'
import { components } from '../components'
import './SingleRepo.css'

const mapStateToProps = state => {
  return {
    ...state.SingleRepo,
    ...state.App
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
          snapshot.forEach(doc => {
            dispatch(actions.setCurrentRepo({ currentRepo: doc.data() }))
            console.log('doc', doc.data())
          })
        })
        .catch(console.error)
    }
  }
}

class SingleRepo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      readMe: null
    }
    this.createMarkup = this.createMarkup.bind(this)
    this.getReadMe = this.getReadMe.bind(this)
  }
  createMarkup () {
    return { __html: this.state.readMe }
  }
  getReadMe () {
    const repo = this.props.currentRepo
    const { githubToken } = this.props.user
    const config = {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: `application/vnd.github.VERSION.html`
      }
    }
    if (repo.owner && !this.state.readMe) {
      axios
        .get(
          `https://api.github.com/repos/${repo.owner.login}/${
            repo.name
          }/readme`,
          config
        )
        .then(result => {
          this.setState({
            readMe: result.data
          })
        })
        .catch(err => console.error(err))
    }
  }

  componentDidUpdate () {
    this.getReadMe()
  }

  componentDidMount () {
    this.props
      .setCurrentRepo(
        this.props.match.params.name,
        this.props.match.params.owner
      )
      .then(() => this.getReadMe())
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
      <section className='section'>
        <div
          className='container'
          style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h1 className='title'>{repo.name}</h1>
            <h2 className='subtitle'>
              by <a href={repo.owner.html_url}>{repo.owner.login}</a>
            </h2>
            <div className='description-container'>
              <p>{repo.description}</p>
            </div>
          </div>
          <nav className='panel' style={{ width: '500px' }}>
            <p className='panel-heading'>
              Quick Builder
              <Link
                to={`/builder/${repo.owner.login}/${repo.name}`}
                className='is-link is-outlined'
                style={{ marginLeft: '53%' }}
              >
                To Full Builder
              </Link>
            </p>
            <a href={repo.html_url} className='panel-block'>
              <span className='icon'>
                <i className='fa fa-github' />
              </span>
              Github
            </a>
            <div className='panel-block quickbuild'>
              <components.QuickBuilder />
            </div>
          </nav>
        </div>
        <div
          className='container'
          style={{ textAlign: 'left', maxWidth: '980px', minWidth: '200px' }}
        >
          <h2 className='subtitle'>Readme</h2>
          <div
            className='markdown-body'
            style={{
              padding: '40px',
              border: '1px solid #e3dde4'
            }}
            dangerouslySetInnerHTML={this.createMarkup()}
          />
        </div>
      </section>
    )
  }
}

const connectedSingleRepo = connect(mapStateToProps, mapDispatchToProps)(
  SingleRepo
)

export default connectedSingleRepo
