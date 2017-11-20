import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.List
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleSelect: (event) => {
      console.log('event', event.target.value)
    },
    getAllBoilerplates: () => {
      firebase.firestore().collection('boilerplates').get().then(results => {
        let boilerplates = Array.from(results.docs).map(doc => doc.data())
        dispatch(actions.allBoilerplatesAction({allBoilerplates: boilerplates}))
      })
    }
  }
}

class List extends React.Component {
  componentDidMount () {
    this.props.getAllBoilerplates()
  }

  render () {
    console.log('props', this.props)
    return (
      <div className='container'>
        <nav className='panel'>
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
          <Link to='/builder' className='panel-block is-active'>
            <span className='panel-icon'>
              <i className='fa fa-book' />
            </span>
            test: CLICK THIS ONE
          </Link>

          {this.props.allBoilerplates && this.props.allBoilerplates.map(boilerplate => {
            return (
              <Link to='/builder' className='panel-block is-active' onClick={this.props.handleSelect} key={boilerplate.id}>
                <span className='panel-icon' >
                  <i className='fa fa-book' />
                </span>
                {boilerplate.name}
              </Link>
            )
          }
          )}
        </nav>
      </div>
    )
  }
}

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default connectedList
