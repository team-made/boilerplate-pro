import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'

import { actions } from './index.js'
import { components } from '../components'
import './List.css'

const mapStateToProps = state => {
  return {
    ...state.List,
    ...state.App
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTopBoilerplates: () => {
      firebase
        .firestore()
        .collection('boilerplates')
        .limit(25)
        .orderBy('stargazers_count', 'desc')
        .get()
        .then(results => {
          let boilerplates = Array.from(results.docs).map(doc => doc.data())
          dispatch(actions.setBoilerplates({ boilerplates: boilerplates }))
        })
    },
    getBpsByLang: language => {
      firebase
        .firestore()
        .collection('boilerplates')
        .where('language', '==', language)
        .limit(25)
        .get()
        .then(results => {
          let boilerplates = Array.from(results.docs).map(doc => doc.data())
          dispatch(actions.setBoilerplates({ boilerplates: boilerplates }))
        })
    },
    getBpsByName: (evt, index) => {
      evt.preventDefault()
      console.log(evt.target.search.value)
      index.search({ query: evt.target.search.value }, (err, content) => {
        if (err) {
          console.error(err)
          return
        }
        dispatch(actions.setBoilerplates({ boilerplates: content.hits }))
      })
    }
  }
}

class List extends React.Component {
  componentDidMount () {
    this.props.getTopBoilerplates()
  }

  render () {
    return (
      <div>
        <section
          className={`hero is-medium is-primary is-bold main-hero ${
            this.props.user.email ? 'inactive' : 'active'
          }`}
        >
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title'>
                Boilerplate<strong style={{ fontWeight: 'bold' }}>Pro</strong>
              </h1>
              <h2 className='subtitle'>Find. Integrate. Deploy.</h2>
              <h2 className='subtitle'>
                A platform for developers to get started with their perfect
                boilerplate.
              </h2>
            </div>
          </div>
        </section>

        <br />
        <div className='container'>
          {this.props.boilerplates.length ? (
            <div className='panel'>
              <p className='panel-heading'>Repositories</p>
              <div className='panel-block'>
                <form
                  style={{ width: '100%' }}
                  onSubmit={evt =>
                    this.props.getBpsByName(evt, this.props.index)
                  }
                >
                  <p className='control has-icons-left'>
                    <input
                      className='input is-fullwidth'
                      type='text'
                      placeholder='search'
                      name='search'
                    />
                    <span className='icon is-left'>
                      <i className='fa fa-search' />
                    </span>
                  </p>
                </form>
              </div>
              <p className='panel-tabs'>
                <a
                  className='is-active'
                  onClick={() => this.props.getTopBoilerplates()}
                >
                  all
                </a>
                <a onClick={() => this.props.getBpsByLang('JavaScript')}>
                  JavaScript
                </a>
                <a onClick={() => this.props.getBpsByLang('CSS')}>CSS</a>
                <a onClick={() => this.props.getBpsByLang('PHP')}>PHP</a>
                <a onClick={() => this.props.getBpsByLang('HTML')}>HTML</a>
                <a onClick={() => this.props.getBpsByLang('Python')}>Python</a>
                <a onClick={() => this.props.getBpsByLang('TypeScript')}>
                  TypeScript
                </a>
                <a onClick={() => this.props.getBpsByLang('Ruby')}>Ruby</a>
              </p>
              <div className='panel-block'>
                <span>
                  Name <i className='fa fa-sort' />
                </span>
                <span style={{ marginLeft: 'auto' }}>
                  <i className='fa fa-sort' /> Stars
                </span>
              </div>
              {this.props.boilerplates.map(boilerplate => (
                <components.ListItem
                  key={boilerplate.id}
                  boilerplate={boilerplate}
                />
              ))}
              <br />
              <components.Pagination />
            </div>
          ) : (
            <section className='hero is-large'>
              <div className='hero-body'>
                <div className='container'>
                  <components.Spinner />
                </div>
              </div>
            </section>
          )}
          <br />
        </div>
      </div>
    )
  }
}

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default connectedList
