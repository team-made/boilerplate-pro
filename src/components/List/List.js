import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'

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
    getAllBoilerplates: () => {
      firebase
        .firestore()
        .collection('boilerplates')
        .limit(25)
        .get()
        .then(results => {
          let boilerplates = Array.from(results.docs).map(doc => doc.data())
          dispatch(
            actions.allBoilerplatesAction({ allBoilerplates: boilerplates })
          )
        })
    }
  }
}

class List extends React.Component {
  componentDidMount () {
    this.props.getAllBoilerplates()
  }

  render () {
    return (
      <div className='container'>
        {this.props.allBoilerplates.length ? (
          <div className='panel'>
            <p className='panel-heading'>repositories</p>
            <div className='panel-block'>
              <p className='control has-icons-left'>
                <input
                  className='input is-small'
                  type='text'
                  placeholder='search'
                />
                <span className='icon is-small is-left'>
                  <i className='fa fa-search' />
                </span>
              </p>
            </div>
            <p className='panel-tabs'>
              <a className='is-active'>all</a>
              <a>Javascript</a>
              <a>CSS</a>
              <a>PHP</a>
              <a>HTML</a>
              <a>Python</a>
              <a>TypeScript</a>
              <a>Ruby</a>
            </p>
            <div className='panel-block'>
              <span>
                Name <i className='fa fa-sort' />
              </span>
              <span style={{ marginLeft: 'auto' }}>
                <i className='fa fa-sort' /> Stars
              </span>
            </div>
            {this.props.allBoilerplates.map(boilerplate => (
              <components.ListItem boilerplate={boilerplate} />
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
