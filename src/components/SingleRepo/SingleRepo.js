import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import showdown from 'showdown'
import { actions } from './index.js'
import { components } from '../components'

const converter = new showdown.Converter()
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
          snapshot.forEach(doc =>
            dispatch(actions.setCurrentRepo({ currentRepo: doc.data() }))
          )
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
    const config = { headers: { Authorization: `token ${githubToken}` } }
    if (repo.owner && !this.state.readMe) {
      axios
        .get(
          `https://api.github.com/repos/${repo.owner.login}/${
            repo.name
          }/readme`,
          config
        )
        .then(result => {
          console.log('result', result)
          this.setState({
            readMe: converter.makeHtml(window.atob(result.data.content))
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
            <p>{repo.description}</p>
          </div>
          <nav className='panel'>
            <p className='panel-heading'>{repo.language}</p>
            <a href={repo.html_url} className='panel-block'>
              <span className='icon'>
                <i className='fa fa-github' />
              </span>
              Github
            </a>
            <div className='panel-block'>
              <Link
                to={`/builder/${repo.owner.login}/${repo.name}`}
                className='button is-link is-outlined is-fullwidth'
              >
                QUICK BUILD
                <components.Builder />
              </Link>
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
            style={{ backgroundColor: '#F7F7F7', padding: '20px' }}
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
