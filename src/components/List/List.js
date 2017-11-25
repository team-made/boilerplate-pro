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
        <div className='panel'>
          <p className='panel-heading'>repositories</p>
          <div className='panel-block'>
            <p className='control has-icons-left'>
              <input
                className='input is-small'
                type='text'
                placeholder='search'
              />
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
          {this.props.allBoilerplates.length ? (
            this.props.allBoilerplates.map(boilerplate => (
              <components.ListItem boilerplate={boilerplate} />
            ))
          ) : (
            <components.Spinner />
          )}
        </div>
        <components.Pagination />
        <br />
      </div>
    )
  }
}

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default connectedList
