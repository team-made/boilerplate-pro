import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import { actions } from './index.js'

import './List.css'

const mapStateToProps = state => {
  return {
    ...state.List
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleSelect: event => {
      console.log('event', event.target.value)
    },
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
    console.log('props', this.props)
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
          <Link to='/builder/test/test' className='panel-block is-active'>
            <span className='panel-icon'>
              <i className='fa fa-book' />
            </span>
            test: CLICK THIS ONE
          </Link>
          {this.props.allBoilerplates.length ? (
            this.props.allBoilerplates.map(boilerplate => {
              return (
                <Link
                  to={`/builder/${boilerplate.full_name}`}
                  className='panel-block'
                  onClick={this.props.handleSelect}
                  key={boilerplate.id}
                >
                  <span className='panel-icon'>
                    <i className='fa fa-book' />
                  </span>
                  <span style={{ textAlign: 'left' }}>
                    <h5 className='title is-5'>{boilerplate.name}</h5>
                    <h6 className='subtitle is-6'>
                      {boilerplate.owner.login}
                    </h6>
                  </span>
                  <span style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    {boilerplate.stargazers_count}
                    <span className='icon has-text-warning'>
                      <i className='fa fa-star' />
                    </span>
                    <span className="tags">
                      <span className="tag is-light">React</span>
                      <span className="tag is-light">Redux</span>
                      <span className="tag is-light">Other</span>
                      <span className="tag is-light">Etc</span>
                    </span>
                  </span>
                </Link>
              )
            })
          ) : (
            <div className='spinner'>
              <div className='bounce1' />
              <div className='bounce2' />
              <div className='bounce3' />
            </div>
          )}
        </div>
        <div
          className='pagination is-centered'
          role='navigation'
          aria-label='pagination'
        >
          <a className='pagination-previous'>Previous</a>
          <a className='pagination-next'>Next page</a>
          <ul className='pagination-list'>
            <li>
              <a className='pagination-link' aria-label='Goto page 1'>
                1
              </a>
            </li>
            <li>
              <span className='pagination-ellipsis'>&hellip;</span>
            </li>
            <li>
              <a className='pagination-link' aria-label='Goto page 45'>
                45
              </a>
            </li>
            <li>
              <a
                className='pagination-link is-current'
                aria-label='Page 46'
                aria-current='page'
              >
                46
              </a>
            </li>
            <li>
              <a className='pagination-link' aria-label='Goto page 47'>
                47
              </a>
            </li>
            <li>
              <span className='pagination-ellipsis'>&hellip;</span>
            </li>
            <li>
              <a className='pagination-link' aria-label='Goto page 86'>
                86
              </a>
            </li>
          </ul>
        </div>
        <br />
      </div>
    )
  }
}

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default connectedList
