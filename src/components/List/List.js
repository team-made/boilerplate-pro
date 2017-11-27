import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
// import algoliasearch from 'algoliasearch/lite'

import { actions } from './index.js'
import { components } from '../components'
import './List.css'

const mapStateToProps = state => {
  return {
    ...state.List
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

        for (var h in content.hits) {
          console.log(
            `Hit(${content.hits[h].objectID}): ${JSON.stringify(
              content.hits[h]
            )}`
          )
        }
      })

      // firebase
      //   .firestore()
      //   .collection('boilerplates')
      //   .where('name', '==', evt.target.search.value)
      //   .limit(25)
      //   .get()
      //   .then(results => {
      //     let boilerplates = Array.from(results.docs).map(doc => doc.data())
      //     dispatch(actions.setBoilerplates({ boilerplates: boilerplates }))
      //   })
    }
  }
}

class List extends React.Component {
  componentDidMount () {
    this.props.getTopBoilerplates()
    // const client = algoliasearch(
    //   process.env.REACT_APP_ALGOLIA_APP_ID,
    //   process.env.REACT_APP_SEARCH_KEY
    // )
    // this.index = client.initIndex('getstarted_actors')
  }

  render () {
    return (
      <div className='container'>
        {this.props.boilerplates.length ? (
          <div className='panel'>
            <p className='panel-heading'>repositories</p>
            <div className='panel-block'>
              <form
                style={{ width: '100%' }}
                onSubmit={evt => this.props.getBpsByName(evt, this.index)}
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
    )
  }
}

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default connectedList
