import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import marked from 'marked'

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
            const data = doc.data()
            dispatch(
              actions.setCurrentRepo({ currentRepo: data, readMe: data.readMe })
            )
          })
        })
        .catch(console.error)
    }
  }
}

class SingleRepo extends Component {
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
            <h1 className='title'>
              <a
                href={repo.html_url}
                style={{ color: 'black', height: '0.5em' }}
                target='_blank'
              >
                <span className='icon'>
                  <i className='fa fa-github' />
                </span>
              </a>{' '}
              {repo.name}
            </h1>
            <h2 className='subtitle'>
              by <a href={repo.owner.html_url}>{repo.owner.login}</a>
            </h2>
            <div style={{ marginBottom: '1em' }}>
              <span className='tag'>{repo.language}</span>
              <span className='icon has-text-warning'>
                <i className='fa fa-star' />
              </span>
              {repo.stargazers_count}
              <span className='icon'>
                <i className='fa fa-code-fork' />
              </span>
              {repo.forks}
            </div>
            <div className='description-container'>
              <p>{repo.description}</p>
            </div>
          </div>
          <nav className='panel' style={{ width: '500px' }}>
            <p className='panel-heading'>Quick Builder</p>
            <div className='panel-block quickbuild'>
              <components.QuickBuilder />
            </div>
          </nav>
        </div>
        <div
          className='container'
          style={{ textAlign: 'left', maxWidth: '980px', minWidth: '200px' }}
        >
          <br />
          <h2 className='subtitle'>Readme</h2>
          <div
            className='markdown-body'
            style={{
              padding: '40px',
              border: '1px solid #e3dde4'
            }}
            dangerouslySetInnerHTML={{
              __html: marked(this.props.currentRepo.readMe)
            }}
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
